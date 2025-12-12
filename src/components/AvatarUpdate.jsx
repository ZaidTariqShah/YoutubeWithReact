import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import { toast } from "react-hot-toast";

const MAX_SIZE = 3 * 1024 * 1024; // 3 MB

const AvatarUpdate = () => {
  const { user, fetchCurrentUser } = useAuth();

  const [preview, setPreview] = useState(user?.avatar || "");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const inputRef = useRef(null);

  // Cleanup preview blob URL when preview changes OR component unmounts
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSelect = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (f.size > MAX_SIZE) {
      toast.error("Image too large. Maximum 3 MB allowed.");
      return;
    }

    // Revoke old preview to avoid memory leak
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    const blobUrl = URL.createObjectURL(f);

    setFile(f);
    setPreview(blobUrl);
  };

  const uploadAvatar = async () => {
    if (!file) {
      toast.error("Please select an avatar before uploading.");
      return;
    }

    const fd = new FormData();
    fd.append("avatar", file); // must match backend upload.single("avatar")

    try {
      setUploading(true);
      setProgress(0);

      const res = await api.patch("/avatar", fd, {
        withCredentials: true,
        onUploadProgress: (e) => {
          if (e.total) {
            setProgress(Math.round((e.loaded * 100) / e.total));
          }
        },
      });

      toast.success(res.data.message || "Avatar updated successfully!");

      await fetchCurrentUser(); // Refresh frontend with backend avatar URL

      setFile(null);
      setProgress(0);

      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to update avatar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl max-w-sm space-y-6 shadow-lg">
      <h2 className="text-slate-200 text-lg font-semibold">Update Avatar</h2>

      {/* Avatar Preview */}
      <div className="flex justify-center">
        <img
          src={preview || user?.avatar}
          alt="avatar"
          className="w-32 h-32 rounded-full border border-slate-700 object-cover shadow-md"
        />
      </div>

      {/* Custom File Input */}
      <div className="space-y-2">
        <p className="text-sm text-slate-300">Select new avatar</p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => inputRef.current?.click()}
            className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg border border-slate-600 hover:bg-slate-700 transition"
          >
            Choose File
          </button>

          <span className="text-slate-400 text-sm">
            {file ? file.name : "No file chosen"}
          </span>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleSelect}
          className="hidden"
        />
      </div>

      {/* Progress Bar */}
      {uploading && (
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Update Button */}
      <button
        disabled={uploading}
        onClick={uploadAvatar}
        className="
        w-full rounded-lg bg-emerald-500 hover:bg-emerald-400 text-emerald-950 
        py-2 font-medium transition 
        disabled:bg-emerald-600/50 disabled:cursor-not-allowed
      "
      >
        {uploading ? `Uploading... ${progress}%` : "Update Avatar"}
      </button>
    </div>
  );
};

export default AvatarUpdate;
