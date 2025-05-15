import type React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'RoomMe',
  description:
    'Coordinate and collaborate with those you live with.',
  icons: {
    icon: '/favicon.ico',
  },
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
      <body>
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
