'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Route {
  path: string;
  label: string;
  requireAuth?: boolean;
}

const routes: Route[] = [
  {
    path: '/',
    label: 'Home',
    requireAuth: false,
  },
];

const NavItem = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-gray-900'
          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
      }`}
    >
      {children}
    </Link>
  );
};

function getNavItems(
  authenticationStatus: string,
  closeMenu: () => void
) {
  return (
    <>
      {routes.map((route) => {
        const userAuthorized =
          route.requireAuth === false ||
          (route.requireAuth === true &&
            authenticationStatus === 'authenticated');

        if (userAuthorized) {
          return (
            <NavItem key={route.path} href={route.path} onClick={closeMenu}>
              {route.label}
            </NavItem>
          );
        } else {
          return null;
        }
      })}
    </>
  );
}

export default function Navbar() {
  const { data, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className='left-0 right-0 top-0 z-50 h-16 bg-background shadow-sm dark:bg-gray-800'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <div className='hidden md:block'>
              <div className='flex items-baseline space-x-4'>
                {getNavItems(status, closeMenu)}
              </div>
            </div>
          </div>
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-expanded={isOpen}
            >
              <span className='sr-only'>Open main menu</span>
              {isOpen ? (
                <X className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <Menu className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className='md:hidden'>
          <div className='space-y-1 bg-background px-2 pb-3 pt-2 shadow-lg dark:bg-gray-800 sm:px-3'>
            {getNavItems(status, closeMenu)}
          </div>
        </div>
      )}
    </nav>
  );
}
