import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "next-themes";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body
        className={cn(poppins.variable,'antialiased flex flex-col min-h-screen px-2')}
      >
        <ThemeProvider attribute='class' defaultTheme="system" enableSystem disableTransitionOnChange>

        <Navbar></Navbar>
        <main className={cn('flex-grow ')}>

        {children}
        </main>
        <footer>
          ....
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
