'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/app/ThemeContext';
import { UseInterSectionObserver } from '@/app/UseInterSectionObserver';
import { ChevronRight } from 'lucide-react';
import projects from './Project';

const AUTO_SCROLL_INTERVAL = 3000;
const ITEMS_PER_SCROLL = 3;

export default function Ourworks() {
  const { isDarkMode } = useTheme();
  const { elementRef: headerRef, isVisible: isHeaderVisible } = UseInterSectionObserver();
  const { elementRef: projectsRef, isVisible: isProjectsVisible } = UseInterSectionObserver({ threshold: 0.2 });

  const [activeCategory, setActiveCategory] = useState('all');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [detailedProject, setDetailedProject] = useState(false);
  const [ProjectId, setProjectId] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const projectsContainerRef = useRef(null);
  const autoScrollRef = useRef(null);



  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'app', label: 'Mobile Apps' },
    { id: 'video', label: 'Video Editing' },
    { id: 'poster', label: 'Poster Design' },
    { id: 'graphic', label: 'Graphic Design' },
    { id: 'branding', label: 'Branding' }
  ];




  const handleOpenProject = (project) => {
    setDetailedProject((prev) => !prev);
    setProjectId(project)
  };

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  const shouldScroll = filteredProjects.length > ITEMS_PER_SCROLL;

  useEffect(() => {
    if (shouldScroll && isProjectsVisible && !isHovering) {
      const startAutoScroll = () => {
        autoScrollRef.current = setInterval(() => {
          setScrollPosition(prev => {
            const container = projectsContainerRef.current;
            if (!container) return prev;

            const maxScroll = container.scrollWidth - container.clientWidth;
            const nextPosition = prev + container.clientWidth / ITEMS_PER_SCROLL;

            if (nextPosition >= maxScroll) {
              container.scrollTo({ left: 0, behavior: 'smooth' });
              return 0;
            }

            container.scrollTo({ left: nextPosition, behavior: 'smooth' });
            return nextPosition;
          });
        }, AUTO_SCROLL_INTERVAL);
      };

      startAutoScroll();
      return () => {
        if (autoScrollRef.current) clearInterval(autoScrollRef.current);
      };
    }
  }, [shouldScroll, isProjectsVisible, activeCategory, isHovering]);

  useEffect(() => {
    setScrollPosition(0);
    if (projectsContainerRef.current) {
      projectsContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeCategory]);

  const ProjectCard = ({ project }) => (
    <div
      className={`
        group relative overflow-hidden rounded-xl 
        transition-all duration-300 transform 
        hover:-translate-y-2 
        shadow-lg hover:shadow-xl 
        h-full 
        ${isDarkMode
          ? 'bg-gray-800/90 border border-gray-700 hover:bg-gray-700/90'
          : 'bg-white/90 border border-gray-200 hover:bg-gray-50/90'
        }
      `}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4 sm:p-6 flex flex-col h-auto sm:h-48">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-1">
          {project.title}
        </h3>
        <p className={`
          text-sm sm:text-base
          ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} 
          mb-4 line-clamp-2 flex-grow
        `}>
          {project.description}
        </p>
        <div className={`
          inline-block px-3 sm:px-4 py-1.5 sm:py-2 
          rounded-full text-sm 
          self-start
          ${isDarkMode ? 'text-gray-300 bg-gray-700/50' : 'text-gray-600 bg-gray-100/50'}
        `}>
          {categories.find(cat => cat.id === project.category)?.label}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`
      min-h-screen 
      py-12 sm:py-16 md:py-20 
      px-4 sm:px-6 md:px-8 lg:px-12 
      transition-colors duration-300 
      ${isDarkMode ? 'text-white' : 'text-black'}
    `}>
      {detailedProject ? (
        <DetailedProject project={ProjectId}  onClose={() => setDetailedProject(false)} />
      ) : (
        <>
          {/* Your existing project list UI */}
        </>
      )}

      {/* Header Section */}
      <div
        ref={headerRef}
        className={`
          transform transition-all duration-1000 
          ${isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          space-y-4 sm:space-y-6
        `}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Projects
        </h1>
        <p className={`
          text-base sm:text-lg pb-4 md:text-xl 
          ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} 
          max-w-3xl
        `}>
          Discover our creative journey through various digital solutions
        </p>
      </div>

      {/* Categories Section */}
      {/* <div className="
        flex flex-wrap gap-2 sm:gap-3 md:gap-4 
        my-8 sm:my-10 md:my-12
      ">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`
              flex items-center gap-2 
              px-4 sm:px-6 py-2 sm:py-3 
              rounded-full text-sm sm:text-base
              transition-all duration-300
              ${activeCategory === category.id
                ? 'bg-green-600 text-white scale-105'
                : `${isDarkMode
                  ? 'hover:bg-gray-700/70 text-gray-300'
                  : 'hover:bg-black/10 text-gray-700'
                }`
              }
            `}
          >
            <ChevronRight className="w-4 h-4" />
            {category.label}
          </button>
        ))}
      </div> */}

      {/* Projects Grid/Scroll Section */}
      <div
        ref={projectsRef}
        className={`
          transform transition-all duration-1000 
          ${isProjectsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}
      >
        <div
          ref={projectsContainerRef}
          className={`
            ${shouldScroll
              ? 'flex space-x-4 sm:space-x-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'
            }
          `}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProjects.map((project) => (
            <button onClick={()=>handleOpenProject(project)}
              key={project.id}
              className={shouldScroll
                ? 'flex-none w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start'
                : ''
              }
            >
              <ProjectCard project={project} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
const DetailedProject = ({ onClose ,project}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`fixed inset-0 z-50 ${isDarkMode ? 'text-white bg-[#1f2937]' : 'text-black bg-gray-100'} shadow-lg rounded-lg m-2 sm:m-5 transition-all duration-1000 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-50'}`}>
      <style>
        {`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #16a34a #e5e7eb;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #16a34a;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #e5e7eb;
          }
        `}
      </style>
      {/* Background Blobs - Responsive sizes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-green-600 rounded-full mix-blend-soft-light blur-xl sm:blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-green-600 rounded-full mix-blend-soft-light blur-xl sm:blur-2xl opacity-20 animate-pulse delay-1000"></div>
      </div>
      <div className="flex justify-end items-end">
        <button onClick={onClose} className={`absolute top-2 right-2 ${isDarkMode ? 'text-white' : 'text-[#1f2937]'}`}>
          ✖ Close
        </button>
      </div>
      <div className="overflow-y-scroll custom-scrollbar md:overflow-hidden flex flex-col md:flex-row justify-between mx-4 sm:mx-10 items-center md:h-full">
        <div className="h-64 sm:h-[85%] w-full md:w-[40%] mb-6 mt-10 md:my-2 md:mb-0 ">
          <img src={project.image} alt={project.title} className="object-cover w-full h-full rounded-lg" />
        </div>
        <div className="md:overflow-y-scroll h-64 sm:h-[85%] w-full md:w-[60%] rounded-lg p-4 sm:p-6 custom-scrollbar">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold">{project.title}</h2>
            <a href={project.link} target='_blank' className="py-2 px-4 bg-green-600 rounded-lg text-white text-sm sm:text-base">Preview</a>
          </div>
          <div dangerouslySetInnerHTML={{ __html: project.content }} />
        </div>
      </div>
    </div>
  );
};
