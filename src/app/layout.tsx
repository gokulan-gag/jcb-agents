import type { Metadata } from "next";
import "../globals.css";
import "../App.css";
import "../side-bar.css";

import { GlobalProvider } from "@/providers/global-provider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Pull Logic Agents",
  description: "Pull Logic Agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          {children}
          <Toaster position="top-right" />
        </GlobalProvider>
      </body>
    </html>
  );
}
