'use client';

import { useTheme } from '@/app/ThemeContext';
import { UseInterSectionObserver } from '@/app/UseInterSectionObserver';
import React from 'react';
import { FaArrowLeft, FaArrowRight, FaLightbulb, FaHandshake, FaTools, FaWallet } from 'react-icons/fa';

const items = [
    {
        id: 1,
        title: 'Innovative Approach',
        description: 'In this technophile era, technologies enhance project management, streamline websites, and optimize design.',
        icon: <FaLightbulb className="text-5xl md:text-6xl text-blue-500 group-hover:scale-110 transition-transform duration-300" />
    },
    {
        id: 2,
        title: 'Client-Centric Services',
        description: 'Tailored solutions and dedicated support to bring your unique ideas and needs to life.',
        icon: <FaHandshake className="text-5xl md:text-6xl text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
    },
    {
        id: 3,
        title: 'Custom Solutions',
        description: 'We prepare customized solutions to bring your ideas to life with productivity, innovation, and accuracy.',
        icon: <FaTools className="text-5xl md:text-6xl text-orange-500 group-hover:scale-110 transition-transform duration-300" />
    },
    {
        id: 4,
        title: 'Affordable Cost',
        description: 'Projects and websites at reasonable prices without compromise.',
        icon: <FaWallet className="text-5xl md:text-6xl text-green-500 group-hover:scale-110 transition-transform duration-300" />
    }
];

export default function Choose() {
    const { isDarkMode } = useTheme();
    const { elementRef, isVisible } = UseInterSectionObserver();

    return (
        <section 
            ref={elementRef} 
            className="relative px-4 md:px-8 lg:px-20 py-16 md:py-20 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">
                <div className={`mb-12 md:mb-16 text-center ${
                    isVisible 
                        ? 'translate-x-0 opacity-100 transition-all duration-1000 ease-in-out' 
                        : '-translate-x-full opacity-0'
                }`}>
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-black'
                    }`}>
                        Why You <span className={`${
                            isDarkMode ? 'text-green-600' : 'text-black'
                        }`}>Choose Us?</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className={`group relative   p-6 rounded-xl shadow-lg 
                                hover:shadow-xl transition-all duration-300 
                                ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}
                                ${isVisible 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-10'
                                }`}
                            style={{
                                transitionDelay: `${index * 150}ms`
                            }}
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                {item.icon}
                                <h2 className={`text-lg md:text-xl font-semibold ${
                                    isDarkMode ? 'text-white' : 'text-black'
                                }`}>
                                    {item.title}
                                </h2>
                                <p className={`text-sm md:text-base ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}