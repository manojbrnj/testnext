import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
// @ts-ignore - allow side-effect CSS import without type declarations
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import { EdgeStoreProvider } from '../lib/edgestore';
import { ThemeProvider } from "next-themes";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import {Toaster} from 'react-hot-toast'
const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  preload: true,
});





export const metadata: Metadata = {
  title: "Voam",
  description: "Voam is a platform for sharing knowledge and ideas.", 
  icons:{
    icon:'/logo.svg'
  }
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
        className={cn(poppins.variable,'antialiased flex flex-col min-h-screen ')}
        >
          <Toaster position='top-center' toastOptions={{
            style:{
              background:'rgb(51 65 85 )',
              color:'#fff'
            }
          }} reverseOrder={false}/>
        <ThemeProvider attribute='class' defaultTheme="system" enableSystem disableTransitionOnChange>
        <Navbar></Navbar>
        <main className={cn('flex-grow w-full ')}>

        {children}
        </main>
        <footer>
          <div className="py-6 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Voam</div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
        </SessionProvider>
    </EdgeStoreProvider>
  );
}
