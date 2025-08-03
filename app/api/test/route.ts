import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    message: "API route کار می‌کنه! 🎉",
    timestamp: new Date().toISOString()
  });
}

export async function POST() {
  return NextResponse.json({ 
    message: "POST method هم کار می‌کنه! ✅",
    timestamp: new Date().toISOString()
  });
}
