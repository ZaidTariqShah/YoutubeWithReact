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
      toast.error(
        err?.response?.data?.message || "Failed to update cover image."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full flex justify-center py-12 px-6">
      <div
        className="w-full max-w-3xl bg-neutral-900/60 border border-neutral-700/60 backdrop-blur-xl 
                   rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.45)] space-y-6
                   transition-all duration-300"
      >
        {/* Header */}
        <h2 className="text-xl font-semibold text-neutral-100 tracking-wide">
          Update Cover Image
        </h2>

        {/* Preview Container */}
        <div className="relative rounded-xl overflow-hidden border border-neutral-700 shadow-lg group h-48">
          <img
            src={preview || user?.coverImage}
            alt="Cover Preview"
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          />

          {/* Glow Layer */}
          <div
            className="absolute inset-0 rounded-xl bg-gradient-to-r 
                       from-emerald-400/10 to-teal-500/10 opacity-0 
                       group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          />
        </div>

        {/* File Picker */}
        <div className="space-y-3">
          <p className="text-sm text-neutral-300">Select a new cover image</p>

          <div
            className="flex items-center justify-between bg-neutral-800/50 border border-neutral-700/70 
                       rounded-lg px-4 py-3"
          >
            <button
              onClick={() => inputRef.current?.click()}
              className="px-4 py-2 bg-neutral-800 border border-neutral-600 text-neutral-200 
                         rounded-lg hover:bg-neutral-700 transition"
            >
              Choose File
            </button>

            <span className="text-neutral-400 text-sm truncate max-w-[220px]">
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
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="w-full bg-neutral-800/70 border border-neutral-700 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all shadow-inner"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={uploadCoverImage}
          disabled={uploading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 
                     text-neutral-900 font-semibold shadow-lg shadow-emerald-500/20
                     hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.98]
                     transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? `Uploading… ${progress}%` : "Update Cover Image"}
        </button>
      </div>
    </div>
  );
};

export default CoverImage;
