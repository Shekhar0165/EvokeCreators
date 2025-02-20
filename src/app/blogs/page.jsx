'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useTheme } from '../ThemeContext'
import blogs from './blogs'

export default function BlogPage() {
  const { isDarkMode } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 6

  const filteredBlogs = blogs.filter(blog => 
    blog.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.searchDescription.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate pagination
  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Calculate total pages
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage)

  return (
    <div className={`p-6 pt-36 `}>
      <div className="max-w-6xl mx-auto">
        <div className='flex justify-between'>
          <div className={`${isDarkMode?'text-white':'text-black'} text-4xl font-bold`}>
            Blogs
          </div>
          
          <div className="mb-6 relative">
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1) // Reset to first page when searching
              }}
              placeholder="Search blogs..."
              className={`w-full p-2 pl-8 border rounded-lg ${isDarkMode 
                ? 'bg-gray-700 text-white border-gray-600' 
                : 'bg-white text-black border-gray-300'}`}
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 absolute left-2 top-3 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBlogs.map((blog, index) => (
            <div 
              key={index} 
              className={`max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ${isDarkMode 
                ? 'dark:bg-gray-800 dark:border-gray-700' 
                : ''}`}
            >
              <img 
                className="rounded-t-lg w-full h-48 object-cover" 
                src={blog.image} 
                alt={blog.heading} 
              />
              <div className="p-5">
                <h5 className={`mb-2 text-2xl font-bold tracking-tight ${isDarkMode 
                  ? 'text-white' 
                  : 'text-gray-900'}`}>
                  {blog.heading}
                </h5>
                <p className={`mb-3 font-normal ${isDarkMode 
                  ? 'text-gray-400' 
                  : 'text-gray-700'}`}>
                  {blog.searchDescription}
                </p>
                <Link 
                  href={`/blogs/${blog.heading}`} 
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ${isDarkMode 
                    ? 'dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' 
                    : ''}`}
                >
                  Read more
                  <svg 
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 14 10"
                  >
                    <path 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <p className={`text-center mt-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No blogs found
          </p>
        )}

        {filteredBlogs.length > blogsPerPage && (
          <div className="flex justify-between items-center mt-8 space-x-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${currentPage === 1 
                ? 'bg-gray-300 cursor-not-allowed' 
                : `${isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-500 hover:bg-blue-600'} text-white`}`}
            >
              Previous
            </button>
            <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${currentPage === totalPages 
                ? 'bg-gray-300 cursor-not-allowed' 
                : `${isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-500 hover:bg-blue-600'} text-white`}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}