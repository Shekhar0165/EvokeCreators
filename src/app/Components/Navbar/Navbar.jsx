'use client';
import React from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/app/ThemeContext';
import Link from 'next/link';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blogs', path: '/blogs' },
    // { name: 'Services', path: '/services' }
  ];

  return (
    <nav className={`fixed w-full top-0 z-40 backdrop-blur-md `}>
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Navbar Content */}
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href='/'>
              <img 
                className={`w-16 h-16  object-contain ${isDarkMode ? 'md:w-20 md:h-20' : 'md:w-[88px] md:h-[88px]'}`} 
                src={isDarkMode ? '/Logo-light.png' : '/Logo-dark.png'} 
                alt="Logo" 
              />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`
                    px-3 py-2 rounded-md text-sm lg:text-base font-medium
                    transition-all duration-200 
                    ${isDarkMode 
                      ? 'text-white hover:bg-white/10' 
                      : 'text-black hover:bg-black/10'}
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isDarkMode 
                    ? 'hover:bg-white/10 text-white' 
                    : 'hover:bg-black/10 text-black'
                }`}
                aria-label="Toggle Theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Contact Button - Hidden on smallest screens */}
              <Link
                href="/contact"
                className={`
                  hidden sm:inline-flex items-center px-4 py-2 
                  rounded-xl text-sm lg:text-base font-medium 
                  transition-colors duration-200 
                  ${isDarkMode 
                    ? 'text-white hover:bg-white/10' 
                    : 'text-black hover:bg-black/10'}
                `}
              >
                Contact
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`
                  md:hidden p-2 rounded-xl
                  transition-colors duration-200 
                  ${isDarkMode 
                    ? 'text-white hover:bg-white/10' 
                    : 'text-black hover:bg-black/10'}
                `}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden 
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            overflow-hidden
          `}
        >
          <div className={`
            px-4 py-2 space-y-2
            ${isDarkMode ? 'bg-black/20' : 'bg-white/20'}
          `}>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`
                  block px-4 py-3 rounded-lg
                  text-base font-medium 
                  transition-all duration-200
                  ${isDarkMode 
                    ? 'text-white hover:bg-white/10' 
                    : 'text-black hover:bg-black/10'}
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Contact Button in Mobile Menu */}
            {/* <Link
              href="/contact"
              className={`
                block sm:hidden px-4 py-3 rounded-lg
                text-base font-medium 
                transition-all duration-200
                ${isDarkMode 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-black hover:bg-black/10'}
              `}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;