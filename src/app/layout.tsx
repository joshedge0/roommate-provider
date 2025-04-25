import type { Metadata } from "next";
import { ThemeProvider } from '@/components/layout/theme-provider';
import { auth } from '@/lib/auth';
import { SessionProvider } from 'next-auth/react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from '@/components/layout/header';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RoomMe",
  description: "Roommate manager",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <SessionProvider session={session}>
            <Header />
            <div className='min-h-[calc(100dvh-8.4rem)]'>{children}</div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
