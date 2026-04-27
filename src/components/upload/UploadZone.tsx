"use client";

import { ContentType } from "@/types";
import { CheckCircle, FileText, Image, Upload, Video, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface UploadZoneProps {
  onFileSelect: (file: File, type: ContentType) => void;
  selectedFile: File | null;
  onClear: () => void;
}

export default function UploadZone({
  onFileSelect,
  selectedFile,
  onClear,
}: UploadZoneProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const type: ContentType = file.type.startsWith("video/")
        ? "video"
        : file.type.startsWith("image/")
        ? "image"
        : "text";

      const url = URL.createObjectURL(file);
      setPreview(url);
      onFileSelect(file, type);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".webm"],
      "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif"],
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024,
  });

  if (selectedFile && preview) {
    return (
      <div className="relative glass-card overflow-hidden group">
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setPreview(null);
            onClear();
          }}
          className="absolute top-4 right-4 z-10 p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Preview */}
        {selectedFile.type.startsWith("video/") && (
          <video
            src={preview}
            controls
            className="w-full max-h-[400px] object-contain bg-black/20"
          />
        )}
        {selectedFile.type.startsWith("image/") && (
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-[400px] object-contain bg-black/20"
          />
        )}

        {/* File info bar */}
        <div className="p-4 flex items-center justify-between border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white truncate max-w-xs">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to analyze
              </p>
            </div>
          </div>
          <span className="px-3 py-1.5 bg-purple-500/20 text-purple-300 text-xs rounded-full font-semibold border border-purple-500/20">
            {selectedFile.type.startsWith("video/") ? "📹 Video" : "🖼️ Image"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        relative glass-card p-10 text-center cursor-pointer transition-all duration-500 group
        ${isDragActive ? "border-purple-500/50 scale-[1.01] glow-purple" : "hover:border-white/10"}
      `}
    >
      <input {...getInputProps()} />

      {/* Animated border on drag */}
      {isDragActive && (
        <div className="absolute inset-0 rounded-[1.25rem] overflow-hidden">
          <div className="absolute inset-0 gradient-border" />
        </div>
      )}

      <div className="relative flex flex-col items-center gap-5">
        {/* Upload icon with glow */}
        <div className="relative">
          <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${
            isDragActive ? "bg-purple-500/30 scale-150" : "bg-purple-500/0 group-hover:bg-purple-500/10"
          }`} />
          <div className={`relative p-5 rounded-2xl transition-all duration-500 ${
            isDragActive
              ? "bg-purple-500/20 rotate-6 scale-110"
              : "bg-white/5 group-hover:bg-white/10"
          }`}>
            <Upload className={`w-8 h-8 transition-all duration-500 ${
              isDragActive ? "text-purple-400" : "text-gray-500 group-hover:text-gray-300"
            }`} />
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-lg font-semibold text-white mb-1">
            {isDragActive ? "Drop it like it's hot 🔥" : "Upload your content"}
          </p>
          <p className="text-sm text-gray-500">
            Drag & drop or click to browse • Video or Image • Max 100MB
          </p>
        </div>

        {/* File type badges */}
        <div className="flex gap-3">
          {[
            { icon: Video, label: "MP4, MOV", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
            { icon: Image, label: "JPG, PNG", color: "text-green-400 bg-green-500/10 border-green-500/20" },
            { icon: FileText, label: "GIF, WebP", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
          ].map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${color}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}