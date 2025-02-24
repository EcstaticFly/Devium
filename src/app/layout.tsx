import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/convexClientProvider";
import Footer from "@/components/Footer";
import { Flip, ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devium",
  description: "Interactive code editor",
  icons: ["/Devium-logo.svg"],
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased
          min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col`}
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <ToastContainer
            position="top-center"
            pauseOnHover={false}
            closeOnClick={false}
            autoClose={3000}
            closeButton={false}
            hideProgressBar={true}
            theme="light"
            transition={Flip}
          />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
