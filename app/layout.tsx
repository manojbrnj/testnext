import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import { EdgeStoreProvider } from '../lib/edgestore';
import { ThemeProvider } from "next-themes";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast'
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import Loading from "./loading";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  preload: true,
});





export const metadataBase = new URL("https://voiceofamuse.com");
export const metadata: Metadata = {
  title: "Voice Of A Muse - Poetry Blog",
  description:
    "Explore Hindi and English poetry, shayari, motivational poems, love poems, life lessons, and creative writing at Voice Of A Muse.",
    icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  keywords: [
    "poetry blog",
    "hindi poetry",
    "english poetry",
    "shayari",
    "love poems",
    "motivational poems",
    "poems",
    "creative writing",
    "life poetry",
    "voice of a muse",
    "voiceofamuse",
    "best poems",
    "poetry website",
    "poetry articles",
    "best poetry blog",
    "top poetry blog",
    "poetry content",
    "indian poetry",
    "poetry platform",
    "poetry community",
    "indian shayari",
    "indian poetry blog",
    "poetry and shayari",
    "indian poetry website",
    "poetry and literature",
    "indian poetry articles",
  ],
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <EdgeStoreProvider>

      <SessionProvider session={session}>

        <html lang="en" suppressHydrationWarning className={cn("font-sans", poppins.variable)}>
          <body
            className={cn(poppins.variable, 'antialiased flex flex-col min-h-screen ')}
          >
            <Toaster position='top-center' toastOptions={{
              style: {
                background: 'rgb(51 65 85 )',
                color: '#fff'
              }
            }} reverseOrder={false} />
            <ThemeProvider attribute='class' defaultTheme="system" enableSystem disableTransitionOnChange>
              <Navbar></Navbar>
              <main className={cn('flex-grow w-full ')}>
                <NextTopLoader />
                <Suspense fallback={<Loading />}>
                  {children}
                </Suspense>
              </main>
              <footer>
                <div className="py-6 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Voice Of A Muse</div>
              </footer>
            </ThemeProvider>
          </body>
        </html>
      </SessionProvider>
    </EdgeStoreProvider>
  );
}
