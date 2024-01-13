import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/NextThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { Toaster } from "@/components/ui/sonner";
import { SocketContainer } from "@/components/providers/SocketContainer";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey="whatsapp-theme"
          >
            <QueryProvider>
              <ModalProvider />
              <Toaster />
              <SocketContainer />
              {children}
            </QueryProvider>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
