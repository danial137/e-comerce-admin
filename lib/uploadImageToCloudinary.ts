import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// کانفیگ Cloudinary با استفاده از متغیرهای محیطی
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

// تابع آپلود عکس که مسیر فایل را دریافت می‌کند و URL امن عکس را برمی‌گرداند
export const uploadImageToCloudinary = async (
  filePath: string
): Promise<string> => {
  try {
    // چک کردن اینکه کلیدهای Cloudinary تنظیم شده باشند
    if (!process.env.CLOUDINARY_CLOUD_NAME || 
        !process.env.CLOUDINARY_API_KEY || 
        !process.env.CLOUDINARY_API_SECRET) {
      throw new Error("کلیدهای Cloudinary در .env.local تنظیم نشده‌اند");
    }

    const result: UploadApiResponse = await cloudinary.uploader.upload(
      filePath,
      {
        folder: "persian-store-products", // نام فولدر برای محصولات فروشگاه فارسی
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        resource_type: "auto", // تشخیص خودکار نوع فایل
        quality: "auto", // کیفیت خودکار
        fetch_format: "auto", // فرمت خودکار
      }
    );

    console.log("✅ آپلود موفقیت‌آمیز:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("❌ خطا در آپلود به Cloudinary:", error);
    throw new Error(`آپلود ناموفق: ${error instanceof Error ? error.message : 'خطای ناشناخته'}`);
  }
};
