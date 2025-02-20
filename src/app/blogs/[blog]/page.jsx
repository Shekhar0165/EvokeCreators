'use client'
import React, { useState } from 'react'
import { useTheme } from '@/app/ThemeContext'
import blogs from '../blogs'
import { useParams } from 'next/navigation'
import { Facebook, Twitter, Linkedin, Copy } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BlogContent = ({ content, isDarkMode }) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  
  // List of void elements that can't have children
  const voidElements = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr'
  ]);
  
  const processNode = (node, index) => {
    if (node.nodeType === 3) { // Text node
      return node.textContent;
    }
    
    const element = node;
    const tagName = element.tagName?.toLowerCase();
    
    // If it's a void element, return it without children
    if (voidElements.has(tagName)) {
      return React.createElement(tagName, {
        key: `${tagName}-${index}`
      });
    }
    
    const children = Array.from(element.childNodes).map((child, childIndex) => 
      processNode(child, childIndex)
    );
    
    let className = element.className || '';
    
    // Add specific styling based on element type
    switch (tagName) {
      case 'h1':
        className = `text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`;
        break;
      case 'p':
        className = `text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;
        break;
      case 'ul':
        className = 'list-disc pl-6 mb-4 space-y-2';
        break;
      case 'li':
        className = `${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;
        break;
      case 'b':
        className = 'font-bold';
        break;
      case 'div':
        if (element.className?.includes('text-4xl')) {
          className = `text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`;
        }
        break;
    }
    
    return React.createElement(
      tagName || 'div',
      { 
        className,
        key: `${tagName}-${index}`
      },
      children
    );
  };
  
  const processedContent = processNode(doc.body.firstChild, 0);
  
  return processedContent;
};

export default function Blog() {
  const { isDarkMode } = useTheme()
  const params = useParams()
  const [copied, setCopied] = useState(false)
  
  const blog = blogs.find(b => decodeURIComponent(params.blog) === b.heading)
  
  if (!blog) return (
    <div className={`p-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Blog not found</div>
  )
  
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    toast.success('URL copied to clipboard!', {
      position: 'top-center',
      autoClose: 2000,
    })
  }
  
  return (
    <div className={`py-10 px-6 md:px-12 pt-36 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-5xl font-bold text-center leading-tight">{blog.heading}</h1>
        <p className={`text-lg text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {blog.description}
        </p>
        
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img src={blog.image} alt={blog.heading} className="w-full h-96 object-cover" />
        </div>
        
        <div className="space-y-6">
          <BlogContent content={blog.content} isDarkMode={isDarkMode} />
        </div>
        
        {/* Social Sharing Buttons */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} 
             target="_blank" 
             className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700">
            <Linkedin size={20} />
          </a>
          <a href={`https://api.whatsapp.com/send?text=${shareUrl}`} 
             target="_blank" 
             className="p-3 bg-green-500 rounded-full text-white hover:bg-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 2.01.6 3.89 1.63 5.47L2 22l4.65-1.61C8.11 21.4 9.99 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1.84 14.69c-2.26 0-4.34-1.19-5.67-3.07l-.41-.61-1.45.46 1.54-3.64 1.25 1.17c1.27-1.12 2.8-1.73 4.5-1.73.24 0 .48.01.71.04.54.05 1.08.27 1.47.64.38.36.64.85.7 1.4.06.55-.05 1.12-.34 1.6-.3.5-.74.92-1.28 1.24l-.58.33c-.12.07-.26.12-.4.16-.19.06-.39.08-.59.08z"/>
            </svg>
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} 
             target="_blank" 
             className="p-3 bg-blue-400 rounded-full text-white hover:bg-blue-500">
            <Twitter size={20} />
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} 
             target="_blank" 
             className="p-3 bg-blue-700 rounded-full text-white hover:bg-blue-800">
            <Facebook size={20} />
          </a>
          <button className="p-3 bg-gray-700 rounded-full text-white hover:bg-gray-800 relative"
                  onClick={handleCopy}>
            <Copy size={20} />
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}