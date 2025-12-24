import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { CertificationSlider } from '@/components/sections/CertificationSlider';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';
import { TerminalChat } from '@/components/sections/TerminalChat';
import { CustomCursor } from '@/components/ui/custom-cursor';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>G. Manoj | AI Engineer & Data Scientist</title>
        <meta name="description" content="Portfolio of G. Manoj, an AI developer specializing in Computer Vision, LLMs, and Full-Stack AI systems. Building intelligent solutions with machine learning and data analytics." />
        <meta name="keywords" content="AI Engineer, Data Scientist, Machine Learning, Computer Vision, LLM, Deep Learning, Python, TensorFlow, PyTorch" />
        <meta property="og:title" content="G. Manoj | AI Engineer & Data Scientist" />
        <meta property="og:description" content="Building intelligent solutions with machine learning, deep learning, and data analytics." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://gmanoj.vercel.app" />
      </Helmet>

      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <CertificationSlider />
        <Contact />
      </main>

      <Footer />
      <TerminalChat />
    </>
  );
};

export default Index;
