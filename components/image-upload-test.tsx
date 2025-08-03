"use client";

import { useState } from "react";

export default function ImageUploadTest() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    setImageUrl("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.imageUrl);
        console.log("✅ آپلود موفق:", data);
      } else {
        setError(data.error || "خطا در آپلود");
        console.error("❌ خطا:", data);
      }
    } catch (err) {
      setError("خطا در ارتباط با سرور");
      console.error("❌ خطا:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">تست آپلود عکس</h2>
      
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {uploading && (
        <div className="text-blue-600 text-center mb-4">
          در حال آپلود...
        </div>
      )}

      {error && (
        <div className="text-red-600 text-center mb-4 p-2 bg-red-50 rounded">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="text-center">
          <p className="text-green-600 mb-2">✅ آپلود موفق!</p>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="max-w-full h-auto rounded border"
          />
          <p className="text-xs text-gray-500 mt-2 break-all">{imageUrl}</p>
        </div>
      )}
    </div>
  );
}
