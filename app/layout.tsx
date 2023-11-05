import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Providers } from "@/Provider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <ToastContainer />

          <div className="topbar flex justify-between items-center px-16 py-5 border-b border-pb_gray_300/60 w-full fixed bg-white z-10">
            <h4 className="font-semibold text-lg">Carbon Footprint</h4>
          </div>
          {children}
        </body>
      </Providers>
    </html>
  );
}
