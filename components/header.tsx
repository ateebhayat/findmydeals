'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Bell, Store } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  if (
    pathname === '/auth/customer/login' ||
    pathname === '/auth/customer/register' ||
    pathname === '/auth/login' ||
    pathname === '/auth/register' ||
    pathname === '/dashboard' ||
    pathname === '/dashboard/settings' ||
    pathname === '/dashboard/analytics' ||
    pathname ==='/customer/dashboard'
  ) {
    return null;
  }
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl transform group-hover:scale-110 transition-transform duration-300">
                <Store className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FindMyDeals</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/" className="text-blue-600 font-semibold text-sm xl:text-base">
              Home
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium text-sm xl:text-base">
              Categories
            </Link>
            <Link href="/brands" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium text-sm xl:text-base">
              Brands
            </Link>
            <Link href="/offers" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium text-sm xl:text-base">
              All Offers
            </Link>
            <Link href="/deals" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium relative text-sm xl:text-base">
              Hot Deals
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-2 h-2 animate-pulse"></span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Notifications - Hidden on mobile */}

            {/* Customer Login - Hidden on small mobile */}
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 hover:border-blue-300 hover:bg-blue-50 bg-transparent hidden md:flex text-xs lg:text-sm px-2 lg:px-4"
              asChild
            >
              <Link href="/auth/customer/login">Customer Login</Link>
            </Button>

            {/* Brand Login */}
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform text-xs lg:text-sm px-3 lg:px-4"
              asChild
            >
              <Link href="/auth/login">
                <span className="hidden sm:inline">Brand Login</span>
                <span className="sm:hidden">Login</span>
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span
                  className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}
                ></span>
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span
                  className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}
                ></span>
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="py-4 space-y-3 border-t border-gray-100 mt-4">
            <Link href="/" className="block px-4 py-2 text-blue-600 font-semibold bg-blue-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link
              href="/categories"
              className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/brands"
              className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Brands
            </Link>
            <Link
              href="/offers"
              className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Offers
            </Link>
            <Link
              href="/deals"
              className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-300 relative"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hot Deals
              <span className="absolute top-2 right-4 bg-red-500 text-white text-xs rounded-full w-2 h-2 animate-pulse"></span>
            </Link>

            {/* Mobile-only links */}
            <div className="border-t border-gray-100 pt-3 mt-3 space-y-3">
              <Link
                href="/auth/customer/login"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-300 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              >
                Customer Login
              </Link>
              <div className="px-4 py-2 flex items-center justify-between sm:hidden">
                <span className="text-gray-600">Notifications</span>
                <div className="relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
