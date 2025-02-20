'use client';
import React, { useState } from 'react';
import { useTheme } from '@/app/ThemeContext';
import { UseInterSectionObserver } from '@/app/UseInterSectionObserver';
import {
    Code,
    Smartphone,
    Video,
    Image,
    PenTool
} from 'lucide-react';
import services from './Services';

const categories = [
    { id: 'web', label: 'Web Development', icon: Code },
    { id: 'app', label: 'Mobile Apps', icon: Smartphone },
    { id: 'video', label: 'Video Editing', icon: Video },
    { id: 'poster', label: 'Poster Design', icon: Image },
    { id: 'graphic', label: 'Graphic Design', icon: PenTool }
];

export default function ServicesPage() {
    const { isDarkMode } = useTheme();
    const { elementRef, isVisible } = UseInterSectionObserver();
    const [activeCategory, setActiveCategory] = useState('video');

    const filteredServices = services.filter(service => service.id === activeCategory);

    return (
        <div
            ref={elementRef}
            className={`min-h-screen pt-44 py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'}`}>
                    <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Our <span className={isDarkMode ? 'text-green-500' : 'text-green-600'}>Services</span>
                    </h1>
                    <p className={`max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Transforming ideas into digital experiences with innovative solutions.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
  {categories.map((category) => {
    const Icon = category.icon;
    return (
      <button
        key={category.id}
        onClick={() => setActiveCategory(category.id)}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 
          w-full sm:w-auto text-center justify-center
          ${
            activeCategory === category.id
              ? isDarkMode
                ? 'bg-green-600 text-white'
                : 'bg-green-500 text-white'
              : isDarkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
      >
        <Icon className="w-5 h-5" />
        <span>{category.label}</span>
      </button>
    );
  })}
</div>


                {/* Services Grid */}
                <div className="grid md:grid-cols lg:grid-cols ">
                    {filteredServices.map((service, index) => (
                        <div
                            key={index}
                            className={`transform transition-all duration-700 ease-out
                                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
                                border rounded-xl overflow-hidden shadow-lg transition-transform
                                ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
                            `}
                        >
                            <div className={`p-8 rounded-2xl shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                                <h1 className="text-3xl font-bold mb-4">{service.intro}</h1>

                                <p className="text-lg text-gray-500 leading-relaxed">{service.description}</p>

                                <div className="my-8 flex justify-center">
                                    <img src={service.image} alt={service.id} className="rounded-lg shadow-md w-full max-w-full" />
                                </div>

                                <div className="mt-6 ">
                                    <div dangerouslySetInnerHTML={{ __html: service.content }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
