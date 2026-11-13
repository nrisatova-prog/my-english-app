import type { Metadata } from "next";
import "./globals.css";
import ServiceWorkerRegister from "./service-worker-register";


export const metadata: Metadata = {
  title: "My English",
  description: "Изучение английского языка от A1 до C2",
  manifest: "/manifest.json",
  applicationName: "My English",
  appleWebApp: {
    capable: true,
    title: "My English",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icon-192.png",
  },
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className="h-full antialiased"
    >
      
<body className="min-h-full flex flex-col">
  <ServiceWorkerRegister />
  {children}
</body>

    </html>
  );
}
