// File: app/cv/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../../components/Navbar';
import AnimatedBackground from '../../components/AnimatedBackground';
import VerificationModal from '../../components/VerificationModal';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// CV data - replace with content from your xpdv.github.io site
const cvData = {
  name: "Your Name",
  contactInfo: {
    email: "your.email@example.com",
    phone: "+1 (123) 456-7890"
  },
  resumeUrl: "/your-name-resume.pdf",
  workExperience: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Tech Company",
      duration: "2021 - Present",
      location: "San Francisco, CA",
      description: [
        "Led the development of responsive and accessible web applications using React, Next.js, and Tailwind CSS",
        "Implemented complex animations and micro-interactions using GSAP and Framer Motion",
        "Collaborated with design and product teams to ensure high-quality implementation of UI/UX designs",
        "Mentored junior developers and conducted code reviews to maintain code quality"
      ]
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Digital Agency",
      duration: "2018 - 2021",
      location: "New York, NY",
      description: [
        "Developed interactive web experiences for clients in various industries",
        "Built custom animations and interactions using JavaScript and CSS",
        "Optimized website performance and accessibility across devices and browsers",
        "Participated in client meetings and presentations to demonstrate technical solutions"
      ]
    },
    {
      id: 3,
      title: "Web Developer Intern",
      company: "Startup Inc.",
      duration: "2017 - 2018",
      location: "Boston, MA",
      description: [
        "Assisted in developing and maintaining company websites and web applications",
        "Created responsive layouts using HTML, CSS, and JavaScript",
        "Collaborated with the design team to implement UI designs",
        "Participated in daily stand-ups and weekly sprint planning meetings"
      ]
    }
  ],
  skills: [
    { category: "Frontend", items: ["JavaScript (ES6+)", "React", "Next.js", "HTML5", "CSS3/SCSS", "Tailwind CSS"] },
    { category: "Animation", items: ["GSAP", "Framer Motion", "CSS Animations", "SVG Animation"] },
    { category: "Tools & Others", items: ["Git", "Webpack", "Figma", "Responsive Design", "Web Performance Optimization", "Accessibility (WCAG)"] }
  ],
  education: [
    {
      degree: "BS in Computer Science",
      institution: "University Name",
      year: "2017",
      details: "Focus on Web Development and User Interface Design"
    }
  ],
  achievements: [
    "Speaker at React Conference 2022",
    "Published article on modern animation techniques in CSS-Tricks",
    "Open source contributor to popular frontend libraries"
  ]
};

export default function CV() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const sectionRefs = useRef({
    experience: null,
    skills: null,
    education: null,
    achievements: null
  });
  
  useEffect(() => {
    // Create scroll animations for each section
    Object.keys(sectionRefs.current).forEach(key => {
      if (sectionRefs.current[key]) {
        // Animate section title
        const title = sectionRefs.current[key].querySelector('h2');
        gsap.set(title, { y: 30, opacity: 0 });
        
        ScrollTrigger.create({
          trigger: title,
          start: 'top bottom-=100',
          end: 'bottom center',
          onEnter: () => {
            gsap.to(title, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out'
            });
          },
          once: true
        });
        
        // Animate section content
        const items = sectionRefs.current[key].querySelectorAll('.animate-item');
        gsap.set(items, { y: 30, opacity: 0 });
        
        ScrollTrigger.create({
          trigger: sectionRefs.current[key],
          start: 'top bottom-=50',
          end: 'bottom center',
          onEnter: () => {
            gsap.to(items, {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.6,
              ease: 'power3.out',
              delay: 0.2
            });
          },
          once: true
        });
      }
    });
    
    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const handleVerifyDownload = () => {
    // Trigger resume download
    const link = document.createElement('a');
    link.href = cvData.resumeUrl;
    link.download = 'Your-Name-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsResumeModalOpen(false);
  };
  
  const handleVerifyContact = () => {
    setIsContactVisible(true);
    setIsContactModalOpen(false);
  };

  return (
    <main className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Navbar />
      
      <div className="container max-w-screen-lg mx-auto px-6 z-10 mt-24 md:mt-32 pb-24">
        <div className="header-section flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className="name-section mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium mb-4">{cvData.name}</h1>
            
            {/* Contact info - initially blurred */}
            <div className={`contact-info text-base md:text-lg opacity-60 ${isContactVisible ? '' : 'blur-sm select-none'}`}>
              <p>Email: {cvData.contactInfo.email}</p>
              <p>Phone: {cvData.contactInfo.phone}</p>
            </div>
          </div>
          
          <div className="action-buttons flex gap-4">
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="px-5 py-3 border border-white hover:bg-white hover:text-black transition-colors text-sm uppercase tracking-wide"
            >
              Download Resume
            </button>
            
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-5 py-3 bg-white text-black hover:bg-gray-200 transition-colors text-sm uppercase tracking-wide"
              disabled={isContactVisible}
            >
              {isContactVisible ? 'Contact Visible' : 'View Contact Info'}
            </button>
          </div>
        </div>
        
        {/* Work Experience Section */}
        <div 
          className="experience-section mb-16" 
          ref={el => sectionRefs.current.experience = el}
        >
          <h2 className="text-2xl md:text-3xl font-medium mb-8 pb-4 border-b border-white/20">
            Work Experience
          </h2>
          
          <div className="experience-list">
            {cvData.workExperience.map((job) => (
              <div key={job.id} className="job-item animate-item mb-10">
                <div className="job-header mb-3">
                  <h3 className="text-xl font-medium">{job.title}</h3>
                  <div className="job-meta flex flex-col md:flex-row md:justify-between text-sm opacity-70">
                    <p className="company">{job.company} | {job.location}</p>
                    <p className="duration">{job.duration}</p>
                  </div>
                </div>
                <ul className="job-description list-disc pl-5 opacity-80 space-y-2">
                  {job.description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Projects Summary Section with link to projects page */}
        <div className="projects-summary-section mb-16">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 pb-4 border-b border-white/20">
            Projects Summary
          </h2>
          
          <div className="project-summary-content animate-item">
            <p className="text-lg mb-6 opacity-80">
              Developed various interactive web applications and digital experiences using modern web technologies. 
              Each project demonstrates proficiency in different aspects of frontend development, from animations to performance optimization.
            </p>
            
            <Link href="/projects" className="inline-block px-5 py-3 border border-white hover:bg-white hover:text-black transition-colors text-sm uppercase tracking-wide">
              View All Projects
            </Link>
          </div>
        </div>
        
        {/* Skills Section */}
        <div 
          className="skills-section mb-16"
          ref={el => sectionRefs.current.skills = el}
        >
          <h2 className="text-2xl md:text-3xl font-medium mb-8 pb-4 border-b border-white/20">
            Technical Skills
          </h2>
          
          <div className="skills-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {cvData.skills.map((skill, index) => (
              <div key={index} className="skill-category animate-item">
                <h3 className="text-lg font-medium mb-4">{skill.category}</h3>
                <ul className="skills-list space-y-2 opacity-80">
                  {skill.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <span className="mr-2 inline-block w-1 h-1 bg-white rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Education Section */}
        <div 
          className="education-section mb-16"
          ref={el => sectionRefs.current.education = el}
        >
          <h2 className="text-2xl md:text-3xl font-medium mb-8 pb-4 border-b border-white/20">
            Education
          </h2>
          
          {cvData.education.map((edu, index) => (
            <div key={index} className="education-item animate-item">
              <h3 className="text-xl font-medium">{edu.degree}</h3>
              <div className="education-meta flex flex-col md:flex-row md:justify-between text-sm opacity-70 mb-2">
                <p className="institution">{edu.institution}</p>
                <p className="year">{edu.year}</p>
              </div>
              <p className="opacity-80">{edu.details}</p>
            </div>
          ))}
        </div>
        
        {/* Achievements Section */}
        {cvData.achievements.length > 0 && (
          <div 
            className="achievements-section"
            ref={el => sectionRefs.current.achievements = el}
          >
            <h2 className="text-2xl md:text-3xl font-medium mb-8 pb-4 border-b border-white/20">
              Achievements & Awards
            </h2>
            
            <ul className="achievements-list space-y-4">
              {cvData.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start animate-item">
                  <span className="mt-1.5 mr-3 inline-block w-1.5 h-1.5 bg-white rounded-full"></span>
                  <span className="opacity-80">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Verification Modals */}
      <VerificationModal 
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onVerify={handleVerifyDownload}
        verificationType="download"
      />
      
      <VerificationModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onVerify={handleVerifyContact}
        verificationType="contact"
      />
    </main>
  );
}