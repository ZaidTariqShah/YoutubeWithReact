import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import api from "../api/api";

const MAX_SIZE = 3 * 1024 * 1024;

const CoverImage = () => {
  const { user, fetchCurrentUser } = useAuth();
  const [preview, setPreview] = useState(user?.coverImage || "");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const inputRef = useRef(null);

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

    const blob = URL.createObjectURL(f);
    setFile(f);
    setPreview(blob);
  };

  const uploadCoverImage = async () => {
    if (!file) {
      toast.error("Please select a cover image first.");
      return;
    }

    const fd = new FormData();
    fd.append("coverImage", file);

    try {
      setUploading(true);
      setProgress(0);

      const res = await api.patch("/cover-image", fd, {
        withCredentials: true,
        onUploadProgress: (e) => {
          if (e.total) {
            setProgress(Math.round((e.loaded * 100) / e.total));
          }
        },
      });

      toast.success(res.data.message || "Cover image updated!");
      await fetchCurrentUser();
      setFile(null);
      setProgress(0);

      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "Failed to update cover image."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-6 shadow-lg space-y-4">
      <h3 className="text-neutral-200 text-lg font-semibold">
        Update Cover Image
      </h3>

      {/* Preview */}
      <div className="w-full h-40 rounded-lg overflow-hidden border border-neutral-700 bg-neutral-900/40">
        <img
          src={preview || user?.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* File Picker */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-neutral-200 border border-neutral-600 transition"
        >
          Choose File
        </button>

        <span className="text-neutral-400 text-sm">
          {file ? file.name : "No file chosen"}
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleSelect}
      />

      {/* Progress Bar */}
      {uploading && (
        <div className="w-full bg-neutral-700 h-3 rounded-full overflow-hidden border border-neutral-600">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Upload Button */}
      <button
        disabled={uploading}
        onClick={uploadCoverImage}
        className="w-full rounded-lg bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-medium py-2 transition disabled:bg-emerald-600/50 disabled:cursor-not-allowed"
      >
        {uploading ? `Uploading... ${progress}%` : "Update Cover Image"}
      </button>
    </div>
  );
};

export default CoverImage;
