import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";

export async function POST(request: NextRequest) {
  try {
    console.log("📁 شروع آپلود فایل...");
    
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.log("❌ هیچ فایلی ارسال نشده");
      return NextResponse.json(
        { error: "هیچ فایلی آپلود نشده" },
        { status: 400 }
      );
    }

    console.log(`📋 فایل دریافت شد: ${file.name} (${file.size} bytes)`);

    // تبدیل فایل به buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // استفاده از temp directory سیستم
    const fs = await import('fs');
    const path = await import('path');
    const os = await import('os');
    
    const tempDir = os.tmpdir();
    const fileName = `${Date.now()}-${file.name}`;
    const tempFilePath = path.join(tempDir, fileName);
    
    console.log(`💾 ذخیره موقت در: ${tempFilePath}`);
    
    // نوشتن فایل در مسیر موقت
    await fs.promises.writeFile(tempFilePath, buffer);

    try {
      console.log("☁️ شروع آپلود به Cloudinary...");
      
      // آپلود به Cloudinary
      const imageUrl = await uploadImageToCloudinary(tempFilePath);
      
      console.log(`✅ آپلود موفق: ${imageUrl}`);

      // پاک کردن فایل موقت
      await fs.promises.unlink(tempFilePath);
      console.log("🗑️ فایل موقت پاک شد");

      return NextResponse.json(
        { 
          imageUrl,
          message: "فایل با موفقیت آپلود شد",
          fileName: file.name,
          fileSize: file.size
        },
        { status: 200 }
      );
    } catch (uploadError) {
      console.error("❌ خطا در آپلود به Cloudinary:", uploadError);
      
      // پاک کردن فایل موقت در صورت خطا
      try {
        await fs.promises.unlink(tempFilePath);
        console.log("🗑️ فایل موقت پاک شد (بعد از خطا)");
      } catch (unlinkError) {
        console.warn("⚠️ نتوانست فایل موقت پاک کند:", unlinkError);
      }
      
      return NextResponse.json(
        { error: "آپلود به Cloudinary ناموفق بود", details: uploadError instanceof Error ? uploadError.message : String(uploadError) },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ خطا در API route:", error);
    return NextResponse.json(
      { error: "خطا در پردازش درخواست", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
