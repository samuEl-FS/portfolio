import React, { useState, useEffect } from 'react';
import BackgroundAurora from './components/BackgroundAurora';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
// import WidgetsPanel from './components/WidgetsPanel';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Portfolio from './sections/Portfolio';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onFinish={() => setIsLoading(false)} />
        ) : (
          <>
            <CustomCursor />
            <CommandPalette />
            <BackgroundAurora />
            <Navbar />
            <main>
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Portfolio />
              <Education />
              <Contact />
            </main>
            <Footer />
            {/* <WidgetsPanel /> */}

            {/* Scroll-to-Top Button */}
            {showScrollTop && (
              <button
                onClick={scrollToTop}
                className="scroll-to-top-btn clickable"
                title="Scroll back to top"
              >
                <ArrowUp size={20} />
              </button>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
