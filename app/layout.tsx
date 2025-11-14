
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
// @ts-ignore - allow importing global CSS without type declarations
import "./globals.css";
import StoreProvider from "./storeProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "share your knowledge",
  description:
    "A platform to share and explore knowledge across various domains.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>{children}

            <Toaster richColors position="top-right" /> 

          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

