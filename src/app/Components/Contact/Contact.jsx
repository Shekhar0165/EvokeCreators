// 1. First, let's update your existing Contact component
'use client';

import React, { useState } from 'react';
import { useTheme } from '@/app/ThemeContext';
import { UseInterSectionObserver } from '@/app/UseInterSectionObserver';
import { Send, Mail, User, MessageSquare, Phone, ArrowRight, Clock, MapPin } from 'lucide-react';

export default function Contact() {
  const { isDarkMode } = useTheme();
  const { elementRef, isVisible } = UseInterSectionObserver();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'all',
    message: ''
  });

  const categories = [
    { id: 'all', label: 'Other' },
    { id: 'web', label: 'Web Development' },
    { id: 'app', label: 'Mobile Apps' },
    { id: 'video', label: 'Video Editing' },
    { id: 'poster', label: 'Poster Design' },
    { id: 'graphic', label: 'Graphic Design' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: 'all',
          message: ''
        });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={elementRef} className="min-h-screen relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative">
        {/* Main Content */}
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Contact Information */}
              <div className={`space-y-8 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
                <div className="space-y-6">
                  <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Get in Touch
                  </h2>
                  <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Ready to start your project? Contact us today and let's discuss your needs.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4">
                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} flex items-start space-x-4`}>
                    <div className="bg-green-500 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Visit Us</h3>
                      <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mohali, Chandigrah, Punjab, 140307</p>
                    </div>
                  </div>

                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} flex items-start space-x-4`}>
                    <div className="bg-green-500 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email Us</h3>
                      <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>creatorsevoke@gmail.com</p>
                    </div>
                  </div>

                  <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} flex items-start space-x-4`}>
                    <div className="bg-green-500 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Working Hours</h3>
                      <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Mon - Fri: 9:30 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 ${
                isVisible ? 'animate-fade-in-right' : 'opacity-0'
              }`}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Full Name
                      </label>
                      <div className="relative">
                        <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-colors
                            ${isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-gray-50 border-gray-200'
                            } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                          placeholder="John Doe"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-colors
                            ${isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-gray-50 border-gray-200'
                            } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                          placeholder="john@example.com"
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-colors
                          ${isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-gray-50 border-gray-200'
                          } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        placeholder="+1 (555) 123-4567"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Project Category
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setFormData(prev => ({ ...prev, category: category.id }));
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                            ${formData.category === category.id
                              ? 'bg-green-500 text-white shadow-lg'
                              : isDarkMode
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          disabled={loading}
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Your Message
                    </label>
                    <div className="relative">
                      <MessageSquare className={`absolute left-3 top-3 w-5 h-5 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-colors
                          ${isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-gray-50 border-gray-200'
                          } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        placeholder="Tell us about your project..."
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-4 rounded-lg hover:bg-green-600 
                      transition-all duration-300 transform hover:scale-105 flex items-center justify-center
                      space-x-2 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}