'use client'
import React, { useState } from 'react'
import { useTheme } from '@/app/ThemeContext'
import { UseInterSectionObserver } from '@/app/UseInterSectionObserver'
import { X, ChevronRight, Star } from 'lucide-react'

const ReviewCard = ({ name, title, quote, imageUrl, isDarkMode, rating = 5, onLearnMore }) => (
  <div className={`p-4 sm:p-6 rounded-xl transition-all duration-500 ease-in-out transform hover:scale-105
    ${isDarkMode ? 'bg-gray-800/80 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'} 
    shadow-lg hover:shadow-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
    w-full`}>
    <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-4">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-green-500 mx-auto sm:mx-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="text-center sm:text-left">
        <h3 className={`font-semibold text-base sm:text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {name}
        </h3>
        {/* <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {title}
        </p> */}
        <div className="flex justify-center sm:justify-start mt-1">
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className="fill-green-500 text-green-500"
            />
          ))}
        </div>
      </div>
    </div>
    <div className={`relative p-3 sm:p-4 rounded-lg mb-4 
      ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50/80'}`}>
      <p className={`italic text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        "{quote.length > 100 ? `${quote.substring(0, 100)}...` : quote}"
      </p>
    </div>
    <button
      onClick={onLearnMore}
      className={`text-xs sm:text-sm font-medium flex items-center group mx-auto sm:mx-0
      ${isDarkMode ? 'text-green-500 hover:text-green-400' : 'text-green-600 hover:text-green-500'}`}
    >
      Learn more
      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transform transition-transform group-hover:translate-x-1" />
    </button>
  </div>
)

const Modal = ({ children, isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
        p-4 sm:p-6 md:p-8 rounded-xl w-full max-w-md relative
        max-h-[90vh] overflow-y-auto`}>
        <button
          onClick={onClose}
          className={`absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full transition-colors
          ${isDarkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'}`}
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  )
}

const Review = () => {
  const { isDarkMode } = useTheme()
  const { elementRef, isVisible } = UseInterSectionObserver()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState(null)

  const reviews = [
    {
      name: "Rini Saxena",
      quote: "People deliver excellent work at an affordable cost, ensuring quality and value for money.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTruQPG9d5VKMAGSlD05ACOVB2IN8LOE32_CA&s",
      rating: 5
    },
    {
      name: "Rashmi",
      quote: "They do their work well and complete it within the time limit. I appreciate the time management aspect of the website. Wishing them all the best for more opportunities!.",
      imageUrl: "/review/image1.jpg",
      rating: 3
    },
    {
      name: "Puneet",
      quote: "The team members' behavior was good, and they made my website very well, even beyond my expectations. Highly Recommended.",
      imageUrl: "/review/image2.jpg",
      rating: 5
    },
    // {
    //   name: "Thomas Gala",
    //   title: "Founder AirTech Window",
    //   quote: "They do their work well and complete it within the time limit. I appreciate the time management aspect of the website. Wishing them all the best for more opportunities!.",
    //   imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTruQPG9d5VKMAGSlD05ACOVB2IN8LOE32_CA&s",
    //   rating: 5
    // },
    // {
    //   name: "Thomas Gala",
    //   title: "Founder AirTech Window",
    //   quote: "They provided great services, and their team members are always ready to help and are cooperative in nature.",
    //   imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTruQPG9d5VKMAGSlD05ACOVB2IN8LOE32_CA&s",
    //   rating: 4
    // },
    // {
    //   name: "Thomas Gala",
    //   title: "Founder AirTech Window",
    //   quote: "I am impressed with their work quality and punctuality. They developed my website efficiently and on time. Wishing them continued success!.",
    //   imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTruQPG9d5VKMAGSlD05ACOVB2IN8LOE32_CA&s",
    //   rating: 5
    // },
    // // Add more reviews as needed
  ];

  const handleLearnMore = (review) => {
    setSelectedReview(review)
    setIsReviewOpen(true)
  }

  return (
    <div
      ref={elementRef}
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
    >
      <div
        className={`text-center mb-8 sm:mb-12 md:mb-16 `}
      >
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4
          ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          What Our{' '}
          <span className={`${isDarkMode ? 'text-green-500' : 'text-green-600'}`}>
            Clients
          </span>{' '}
          Say
        </h1>
        <p className={`text-base sm:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
          Read authentic stories from our satisfied clients about their experience working with us
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <div
            key={`${review.name}-${index}`}
            className={`transform transition-all duration-700 ease-out
              ${isVisible ? 'translate-y-0 md:opacity-100' : 'translate-y-20 md:opacity-0'}`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <ReviewCard
              {...review}
              isDarkMode={isDarkMode}
              onLearnMore={() => handleLearnMore(review)}
            />
          </div>
        ))}
      </div>

      <div className="mt-28 sm:mt-10 md:mt-12 text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className={`px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium
            transform transition-all duration-300 hover:scale-105
            ${isDarkMode
              ? 'bg-green-600 text-white hover:bg-green-500'
              : 'bg-green-600 text-white hover:bg-green-500'
            } shadow-lg hover:shadow-xl`}
        >
          Share Your Experience
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isDarkMode={isDarkMode}
      >
        <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Share Your Experience
        </h2>
        <form 
  onSubmit={async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          rating: formData.get('rating'),
          review: formData.get('review'),
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Show success message
        alert('Thank you for your review!');
        setIsModalOpen(false);
      } else {
        // Show error message
        alert(data.message || 'Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred. Please try again later.');
    }
  }} 
  className="space-y-4 sm:space-y-6"
>
  <div>
    <label className={`block mb-1 sm:mb-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      Name
    </label>
    <input
      type="text"
      name="name"
      required
      className={`w-full p-2 sm:p-3 border rounded-lg transition-colors text-sm sm:text-base
      ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}
      focus:ring-2 focus:ring-green-500 focus:border-transparent`}
      placeholder="Your name"
    />
  </div>
  
  <div>
    <label className={`block mb-1 sm:mb-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      Email
    </label>
    <input
      type="email"
      name="email"
      required
      className={`w-full p-2 sm:p-3 border rounded-lg transition-colors text-sm sm:text-base
      ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}
      focus:ring-2 focus:ring-green-500 focus:border-transparent`}
      placeholder="Your email address"
    />
  </div>

  <div>
    <label className={`block mb-1 sm:mb-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      Rating
    </label>
    <select
      name="rating"
      required
      className={`w-full p-2 sm:p-3 border rounded-lg transition-colors text-sm sm:text-base
      ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}
      focus:ring-2 focus:ring-green-500 focus:border-transparent`}
    >
      <option value="">Select rating</option>
      <option value="5">5 stars - Excellent</option>
      <option value="4">4 stars - Very Good</option>
      <option value="3">3 stars - Good</option>
      <option value="2">2 stars - Fair</option>
      <option value="1">1 star - Poor</option>
    </select>
  </div>

  <div>
    <label className={`block mb-1 sm:mb-2 text-sm sm:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      Review
    </label>
    <textarea
      name="review"
      required
      rows="4"
      className={`w-full p-2 sm:p-3 border rounded-lg transition-colors text-sm sm:text-base
      ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}
      focus:ring-2 focus:ring-green-500 focus:border-transparent`}
      placeholder="Share your experience..."
    ></textarea>
  </div>

  <button
    type="submit"
    className="w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg hover:bg-green-700 
    transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-green-500 
    focus:ring-offset-2 text-sm sm:text-base"
  >
    Submit Review
  </button>
</form>
      </Modal>

      <Modal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        isDarkMode={isDarkMode}
      >
        {selectedReview && (
          <>
            <h2 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {selectedReview.name}
            </h2>
            <p className={`text-base sm:text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {selectedReview.title}
            </p>
            <div className="flex mb-3 sm:mb-4">
              {[...Array(selectedReview.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="fill-green-500 text-green-500"
                />
              ))}
            </div>
            <p className={`italic text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              "{selectedReview.quote}"
            </p>
          </>
        )}
      </Modal>
    </div>
  )
}

export default Review