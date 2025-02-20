'use client';
import React from 'react';
import { useTheme } from '@/app/ThemeContext';
import { UseInterSectionObserver } from '@/app/UseInterSectionObserver';
import Link from 'next/link';
import { ArrowRight, Code, Palette, Zap } from 'lucide-react';

export default function HeroSection() {
    const { isDarkMode } = useTheme();
    const { elementRef, isVisible } = UseInterSectionObserver();

    return (
        <div
            ref={elementRef}
            className={`
                relative min-h-screen
                transition-colors py-80 sm:pt-60 md:pt-2 md:py-2  duration-300 
                ${isDarkMode ? ' text-white' : ' text-black'}
                overflow-hidden
            `}
        >
            {/* Background Elements - Kept same for lg */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className={`absolute top-56 -right-24 w-96 h-96 rounded-full ${isDarkMode ? 'bg-green-800' : 'bg-green-200'} blur-3xl opacity-20`}></div>
                <div className={`absolute bottom-32 -left-24 w-64 h-64 rounded-full ${isDarkMode ? 'bg-blue-800' : 'bg-blue-200'} blur-3xl opacity-20`}></div>
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-green-900/10 to-transparent"></div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 py-8 lg:py-16">
                {/* Left Column - Main Text Content */}
                <div className={`w-full lg:w-6/12 space-y-6 text-center lg:text-left ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
    <div className={`
        inline-block px-4 py-1 rounded-full text-sm font-medium mb-2
        ${isDarkMode 
            ? 'bg-green-900/30 text-green-300' 
            : 'bg-green-100 text-green-800'}
    `}>
        Digital Innovation Studio
    </div>
    
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
            Innovate, Create
        </span>{' '}
        <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>
            & Elevate
        </span>
    </h1>
    
    <p className={`
        text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0
        ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
    `}>
        Transform your digital presence with stunning solutions that blend creativity with cutting-edge technology.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
        <Link 
            href='/contact' 
            className="
                px-6 py-3 
                rounded-lg
                bg-green-600 
                text-white 
                font-medium
                hover:bg-green-700
                transition duration-300
                flex items-center justify-center gap-2
                shadow-lg hover:shadow-xl
            "
        >
            Get Started <ArrowRight size={18} />
        </Link>
        <Link 
            href='/about' 
            className={`
                px-6 py-3 
                rounded-lg
                font-medium
                flex items-center justify-center gap-2
                transition duration-300
                shadow-md hover:shadow-lg
                ${isDarkMode 
                    ? 'bg-gray-800 text-white hover:bg-gray-700' 
                    : 'bg-white text-gray-800 hover:bg-gray-100'}
            `}
        >
            Learn More
        </Link>
    </div>
</div>
                {/* Right Column - Featured Card */}
                <div className={`w-full lg:w-5/12 ${isVisible ? 'animate-slideInRight' : 'opacity-0 translate-x-8'}`}>
                    <div className={`
                        rounded-xl sm:rounded-2xl 
                        p-4 sm:p-6 lg:p-8
                        shadow-xl
                        backdrop-blur-sm
                        ${isDarkMode 
                            ? 'bg-gray-800/80 border border-gray-700/50' 
                            : 'bg-white/90 border border-gray-200'}
                    `}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* Service Cards */}
                            {[
                                {
                                    icon: <Palette size={24} className={`${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />,
                                    title: "Creative Design",
                                    desc: "Stunning visuals that capture your brand's essence"
                                },
                                {
                                    icon: <Code size={24} className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />,
                                    title: "Web Development",
                                    desc: "Responsive websites built with modern frameworks"
                                },
                                {
                                    icon: <Zap size={24} className={`${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />,
                                    title: "Performance",
                                    desc: "Lightning-fast experiences for your users"
                                },
                                {
                                    icon: <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-purple-400' : 'bg-purple-600'} text-white font-bold`}>A</div>,
                                    title: "Accessibility",
                                    desc: "Inclusive design for everyone"
                                }
                            ].map((service, index) => (
                                <div key={index} className={`
                                    p-4 
                                    rounded-xl 
                                    ${isDarkMode 
                                        ? 'bg-gray-700/50 hover:bg-gray-700' 
                                        : 'bg-gray-50 hover:bg-gray-100'}
                                    transition-all duration-300
                                    hover:shadow-md
                                    hover:-translate-y-1
                                `}>
                                    <div className="mb-3">{service.icon}</div>
                                    <h3 className="text-base sm:text-lg font-semibold mb-2">{service.title}</h3>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{service.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Bottom Wave Divider */}
            {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className={`${isDarkMode ? 'fill-gray-800' : 'fill-white'} w-full h-8 sm:h-10 lg:h-12`}>
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,125.27,111.31,183.09,101.42,256.43,88.77,280.39,63.32,321.39,56.44Z"></path>
                </svg>
            </div>
             */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out forwards;
                }
                .animate-slideInRight {
                    animation: slideInRight 0.8s ease-out forwards;
                    animation-delay: 0.2s;
                }
            `}</style>
        </div>
    );
}