import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { APP_NAME, APP_DESCRIPTION,APP_SLOGAN } from "@/lib/constants";
import { SmoothScroll } from "@/components/SmoothScroll";
import CustomCursor from "@/components/Cursor";
import ScrollToTop from "@/components/ScrollToTop";



const geistSans = Geist({ 
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
   title:{
    template:`%s | ${APP_NAME}`,
    default: `${APP_NAME}.${APP_SLOGAN}`,
  },
   description:APP_DESCRIPTION, 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
     
      <body>
      
      
     {children}

     
      <CustomCursor/>
      </body>
     

    </html>
  );
}
