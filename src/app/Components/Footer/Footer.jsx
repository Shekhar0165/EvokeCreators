import React from 'react';
import { X, Linkedin, Instagram } from 'lucide-react';
import { FaPinterest } from 'react-icons/fa';
import { FaQuora } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blogs', path: '/blogs' },
    // { name: 'Services', path: '/services' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="hover:text-white transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a href="https://in.pinterest.com/evokecreators/" target='_blank' className="hover:text-white transition-colors duration-300">
              <FaPinterest size={20} />
            </a>
            <a href="https://x.com/evokecreators" target='_blank' className="hover:text-white transition-colors duration-300">
              <X size={20} />
            </a>
            <a href="https://www.linkedin.com/in/evokecreators/" target='_blank' className="hover:text-white transition-colors duration-300">
              <Linkedin size={20} />
            </a>
            <a href="https://www.instagram.com/evokecreators/" target='_blank' className="hover:text-white transition-colors duration-300">
              <Instagram size={20} />
            </a>
            <a href="https://www.quora.com/profile/Evoke-Creators" target='_blank' className="hover:text-white transition-colors duration-300">
              <FaQuora size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 text-sm">
          <p>© {new Date().getFullYear()} Evoke Creator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;