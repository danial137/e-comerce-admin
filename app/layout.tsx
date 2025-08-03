import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { ModelProvider } from "@/providers/model-provider";
import { ToastProvider } from "@/providers/toast-provider";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  preload: false,
});


export const metadata: Metadata = {
  title: "persian store",
  description: "designed by persian store",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body
        className={`${poppins.className}  antialiased`}
        >
          <ModelProvider />
          <ToastProvider/>
        {children}
      </body>
      </html>
    </ClerkProvider>
  );
}
