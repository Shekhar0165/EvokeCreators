'use client';
import React, { useState, useEffect } from 'react';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';

export default function Services() {
    const images = [
        'HeroSection/GraphicPoster.jpg',
        // 'HeroSection/image2.jpg',
        // 'HeroSection/image3.webp',
        // 'HeroSection/image4.webp'
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (images.length === 0) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);

    // Function to handle next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Function to handle previous image
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <>
            <div className="w-full h-[90%] overflow-hidden relative z-0">
                {/* Left Arrow */}
                {/* <button
                    onClick={prevImage}
                    className="absolute lg:left-20 left-4 top-1/2 transform -translate-y-1/2 z-10 
                  hover:text-green-600 text-white p-2 rounded-full
                 transition-all duration-200 ease-in-out"
                    aria-label="Previous image"
                >
                    <MdArrowBackIos size={24} />
                </button> */}

                {/* Right Arrow */}
                {/* <button
                    onClick={nextImage}
                    className="absolute lg:right-20 right-4 top-1/2 transform -translate-y-1/2 z-10 
                  hover:text-green-600 text-white p-2 rounded-full
                 transition-all duration-200 ease-in-out"
                    aria-label="Next image"
                >
                    <MdArrowForwardIos size={24} />
                </button> */}

                <div
                    className="relative h-full flex transition-transform duration-1000 ease-in-out"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                >
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <div key={index} className="w-full h-full flex justify-center items-center flex-shrink-0">
                                <div className='w-[80%]'>

                                    <img
                                        src={`/${image}`}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <p>No images available</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}