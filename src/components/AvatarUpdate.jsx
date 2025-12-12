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

  // Cleanup preview blob URL
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
    fd.append("avatar", file);

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
      await fetchCurrentUser();

      setFile(null);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update avatar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full flex justify-center py-12 px-6">
      <div
        className="w-full max-w-md bg-neutral-900/60 border border-neutral-700/60 backdrop-blur-xl 
                   rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.45)] p-8 
                   transition-all duration-300"
      >
        {/* Header */}
        <h2 className="text-xl font-semibold text-neutral-100 mb-6 tracking-wide">
          Update Avatar
        </h2>

        {/* Avatar Preview */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <img
              src={preview || user?.avatar}
              alt="avatar"
              className="w-36 h-36 rounded-full border-2 border-neutral-700 
                         object-cover shadow-xl transition-all duration-300 
                         group-hover:scale-105 group-hover:border-emerald-400/60"
            />

            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-500/20 
                         scale-0 group-hover:scale-100 blur-xl transition-transform duration-300"
            />
          </div>
        </div>

        {/* File Selector */}
        <div className="space-y-3">
          <p className="text-sm text-neutral-300">Select new avatar</p>

          <div
            className="flex items-center justify-between bg-neutral-800/50 border border-neutral-700/70 
                       rounded-lg px-4 py-3 transition-all"
          >
            <button
              onClick={() => inputRef.current?.click()}
              className="px-4 py-2 rounded-lg bg-neutral-800 text-neutral-200 border border-neutral-600 
                         hover:bg-neutral-700 transition-all"
            >
              Choose File
            </button>

            <span className="text-neutral-400 text-sm truncate max-w-[160px]">
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
          <div className="mt-5 w-full bg-neutral-800/70 rounded-full h-3 overflow-hidden border border-neutral-700">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 shadow-inner transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          disabled={uploading}
          onClick={uploadAvatar}
          className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 
                     text-neutral-900 font-semibold shadow-lg shadow-emerald-500/20 
                     hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.98] 
                     transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? `Uploading... ${progress}%` : "Update Avatar"}
        </button>
      </div>
    </div>
  );
};

export default AvatarUpdate;
