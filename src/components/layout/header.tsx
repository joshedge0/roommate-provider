'use client';

import { UserMenu } from './user-menu';
//import Navbar from './navbar';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export function Header() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? resolvedTheme || theme : 'light';

  return (
    <header className='left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-border bg-background px-6 dark:bg-gray-800'>
      <div className='flex items-center justify-center gap-4'>

      </div>
      <UserMenu />
    </header>
  );
}
