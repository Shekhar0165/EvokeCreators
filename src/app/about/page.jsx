'use client'
import React from 'react'
import { useTheme } from '../ThemeContext'
import { UseInterSectionObserver } from '../UseInterSectionObserver'
import { FaLightbulb, FaRocket, FaBullseye, FaUsers, FaCog, FaChartLine, FaCode, FaPuzzlePiece, FaCheckCircle, FaGlobe } from 'react-icons/fa'
import Link from 'next/link'

const Page = () => {
  const { isDarkMode } = useTheme()
  const { elementRef: heroRef, isVisible: heroVisible } = UseInterSectionObserver()
  const { elementRef: aboutRef, isVisible: aboutVisible } = UseInterSectionObserver()
  const { elementRef: servicesRef, isVisible: servicesVisible } = UseInterSectionObserver()
  const { elementRef: expertiseRef, isVisible: expertiseVisible } = UseInterSectionObserver()
  const { elementRef: processRef, isVisible: processVisible } = UseInterSectionObserver()
  const { elementRef: statsRef, isVisible: statsVisible } = UseInterSectionObserver()
  const { elementRef: contactRef, isVisible: contactVisible } = UseInterSectionObserver()

  return (
    <div className={`min-h-screen ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`pt-32 px-6 md:px-16 lg:px-24 transition-all duration-1000 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Transforming Ideas into Digital Reality
          </h1>
          <p className={`text-xl my-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            At Evoke Creator, we're not just building software – we're crafting digital experiences 
            that revolutionize how businesses operate. Through innovative solutions and cutting-edge 
            technology, we help organizations thrive in the digital age.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <FaRocket className="text-4xl text-green-500 animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={aboutRef} 
        className="py-20 px-6 md:px-16 lg:px-24"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${
          aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold mb-16 text-center">
            Pioneering Digital Excellence
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-2xl transition-all duration-700 ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } shadow-xl transform ${
              aboutVisible ? 'translate-x-0' : '-translate-x-full'
            }`}>
              <div className="flex items-center mb-6">
                <FaUsers className="text-3xl text-green-500 mr-4" />
                <h3 className="text-2xl font-semibold">Who We Are</h3>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-4`}>
                <span className="block mb-4">
                  Evoke Creator stands at the forefront of digital innovation, bringing together passionate 
                  technologists, creative thinkers, and industry experts. We're more than just a digital 
                  solutions company – we're your partners in digital transformation.
                </span>
                <span className="block">
                  With years of experience across various industries, our team combines technical expertise 
                  with creative innovation to deliver solutions that not only meet but exceed expectations.
                </span>
              </p>
            </div>

            <div className={`p-8 rounded-2xl transition-all duration-700 delay-200 ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } shadow-xl transform ${
              aboutVisible ? 'translate-x-0' : 'translate-x-full'
            }`}>
              <div className="flex items-center mb-6">
                <FaBullseye className="text-3xl text-green-500 mr-4" />
                <h3 className="text-2xl font-semibold">Our Mission</h3>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-4`}>
                <span className="block mb-4">
                  Our mission is to empower businesses through innovative digital solutions that drive 
                  growth, efficiency, and competitive advantage. We believe in creating technology that 
                  makes a meaningful impact on our clients' success.
                </span>
                <span className="block">
                  By combining cutting-edge technology with strategic thinking, we help organizations 
                  navigate digital transformation and achieve sustainable growth in an ever-evolving 
                  digital landscape.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section
        ref={expertiseRef}
        className="py-20 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/30"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${
          expertiseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold mb-16 text-center">Our Expertise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaCode className="text-3xl text-green-500" />,
                title: "Custom Software Development",
                description: "Tailored solutions built with cutting-edge technology to address your unique business challenges."
              },
              {
                icon: <FaGlobe className="text-3xl text-green-500" />,
                title: "Web Applications",
                description: "Responsive, scalable web applications that deliver exceptional user experiences across all devices."
              },
              {
                icon: <FaCog className="text-3xl text-green-500" />,
                title: "System Integration",
                description: "Seamless integration services that connect your systems and streamline business processes."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} shadow-xl
                  transform transition-all duration-700 hover:scale-105`}
              >
                <div className="flex flex-col items-center text-center">
                  {item.icon}
                  <h3 className="text-xl font-semibold my-4">{item.title}</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        ref={processRef}
        className="py-20 px-6 md:px-16 lg:px-24"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${
          processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold mb-16 text-center">Our Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <FaPuzzlePiece className="text-3xl text-green-500" />,
                step: "1",
                title: "Discovery",
                description: "Understanding your goals and challenges"
              },
              {
                icon: <FaLightbulb className="text-3xl text-green-500" />,
                step: "2",
                title: "Strategy",
                description: "Developing a comprehensive solution plan"
              },
              {
                icon: <FaCog className="text-3xl text-green-500" />,
                step: "3",
                title: "Development",
                description: "Building your solution with precision"
              },
              {
                icon: <FaCheckCircle className="text-3xl text-green-500" />,
                step: "4",
                title: "Delivery",
                description: "Launching and optimizing your solution"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} shadow-xl
                  transform transition-all duration-700 hover:scale-105`}
              >
                <div className="flex flex-col items-center text-center">
                  {item.icon}
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center my-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section
        ref={statsRef}
        className="py-20 px-6 md:px-16 lg:px-24"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${
          statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "100+", label: "Projects Completed" },
              { number: "50+", label: "Happy Clients" },
              { number: "5+", label: "Years Experience" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} shadow-xl text-center
                  transform transition-all duration-700 hover:scale-105`}
              >
                <h3 className="text-3xl font-bold text-green-500 mb-2">{stat.number}</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section 
        ref={contactRef}
        className={`py-20 px-6 md:px-16 lg:px-24 transition-all duration-1000 ${
          contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Digital Journey</h2>
          <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Ready to transform your business with innovative digital solutions? Let's discuss 
            how we can help you achieve your goals and create lasting impact in your industry.
          </p>
          <Link 
            href='/contact' 
            className={`inline-block px-8 py-3 rounded-lg shadow-lg font-medium transition-all duration-300 
              ${isDarkMode 
                ? 'bg-green-500 text-white hover:text-black hover:bg-gray-100' 
                : 'bg-green-600 text-white hover:bg-gray-800'} 
              transform hover:scale-105`}
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Page