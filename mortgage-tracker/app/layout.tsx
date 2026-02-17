import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export const metadata: Metadata = {
  title: "Mortgage Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
    <body>
    <ToastContainer position="top-right" autoClose={3000} />
      {children}
    </body>
  </html>
  );
}
