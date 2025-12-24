import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Phone, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Globe from 'react-globe.gl';

// Neural network particles component
const NeuralParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const connections: { from: number; to: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(160, 84%, 39%, ${0.3 + p.size * 0.1})`;
        ctx.fill();

        // Draw connections
        particles.forEach((p2, j) => {
          if (i >= j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(160, 84%, 39%, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

// Globe Component
const GlobeVisualization = () => {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const size = Math.min(containerRef.current.offsetWidth, 500);
        setDimensions({ width: size, height: size });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      // Configure globe controls
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;
      controls.enablePan = false;
      
      // Set initial view
      globeRef.current.pointOfView({ lat: 20, lng: 78, altitude: 2.5 });
    }
  }, []);

  // Generate arc data for visualization
  const arcsData = [
    { startLat: 13.08, startLng: 80.27, endLat: 37.77, endLng: -122.42, color: ['#10b981', '#06b6d4'] },
    { startLat: 13.08, startLng: 80.27, endLat: 51.50, endLng: -0.12, color: ['#10b981', '#8b5cf6'] },
    { startLat: 13.08, startLng: 80.27, endLat: 35.68, endLng: 139.69, color: ['#10b981', '#f59e0b'] },
    { startLat: 13.08, startLng: 80.27, endLat: 1.35, endLng: 103.82, color: ['#10b981', '#ef4444'] },
    { startLat: 13.08, startLng: 80.27, endLat: 40.71, endLng: -74.00, color: ['#10b981', '#3b82f6'] },
    { startLat: 13.08, startLng: 80.27, endLat: -33.86, endLng: 151.20, color: ['#10b981', '#ec4899'] },
  ];

  // Points data (Chennai highlighted)
  const pointsData = [
    { lat: 13.08, lng: 80.27, size: 0.15, color: '#10b981', name: 'Chennai' },
    { lat: 37.77, lng: -122.42, size: 0.08, color: '#06b6d4', name: 'San Francisco' },
    { lat: 51.50, lng: -0.12, size: 0.08, color: '#8b5cf6', name: 'London' },
    { lat: 35.68, lng: 139.69, size: 0.08, color: '#f59e0b', name: 'Tokyo' },
    { lat: 1.35, lng: 103.82, size: 0.08, color: '#ef4444', name: 'Singapore' },
    { lat: 40.71, lng: -74.00, size: 0.08, color: '#3b82f6', name: 'New York' },
  ];

  // Rings data for pulsing effect
  const ringsData = [
    { lat: 13.08, lng: 80.27, maxR: 5, propagationSpeed: 2, repeatPeriod: 1500 },
  ];

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      {/* Glow effect behind globe */}
      <div 
        className="absolute rounded-full blur-3xl"
        style={{
          width: dimensions.width * 0.8,
          height: dimensions.height * 0.8,
          background: 'radial-gradient(circle, hsla(160, 84%, 39%, 0.3) 0%, transparent 70%)',
        }}
      />
      
      {/* Globe */}
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#10b981"
        atmosphereAltitude={0.15}
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.5}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcStroke={0.5}
        pointsData={pointsData}
        pointAltitude={0.01}
        pointColor="color"
        pointRadius="size"
        ringsData={ringsData}
        ringColor={() => '#10b981'}
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
      />
      
      {/* Decorative rings */}
      <div 
        className="absolute pointer-events-none rounded-full border border-primary/20"
        style={{
          width: dimensions.width * 1.1,
          height: dimensions.height * 1.1,
        }}
      />
      <div 
        className="absolute pointer-events-none rounded-full border border-primary/10"
        style={{
          width: dimensions.width * 1.25,
          height: dimensions.height * 1.25,
        }}
      />
    </div>
  );
};

// Decorative lamp component
const DecorativeLamp = ({ isDark }: { isDark: boolean }) => (
  <motion.div
    className="absolute left-4 md:left-8 top-1/3 -translate-y-1/2"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 1, duration: 0.8 }}
  >
    <div className="relative">
      {/* Lamp post */}
      <div className="w-1 h-32 bg-gradient-to-b from-muted-foreground/40 to-muted-foreground/20 rounded-full" />
      
      {/* Lamp head */}
      <div className="absolute -top-2 -left-3 w-7 h-5">
        <div className="w-full h-full bg-muted-foreground/60 rounded-t-lg" />
        {/* Light glow */}
        {!isDark && (
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsla(45, 90%, 60%, 0.3) 0%, transparent 70%)',
            }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
      
      {/* Cat silhouette */}
      <motion.div
        className="absolute -bottom-4 -left-4 text-2xl"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🐱
      </motion.div>
    </div>
  </motion.div>
);

export const Hero = () => {
  const [isDark] = useState(true); // Always dark mode

  const socialLinks = [
    { icon: Github, href: 'https://github.com/gmanoj2005', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/manoj-ganesan-cse', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:manojindira2004@gmail.com', label: 'Email' },
    { icon: Phone, href: 'tel:+917305253038', label: 'Phone' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="neural-bg" />
      <div className="grid-pattern" />
      <NeuralParticles />
      <div className="noise" />

      {/* Decorative lamp */}
      <DecorativeLamp isDark={isDark} />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Welcome to my Portfolio
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4"
            >
              Hi, I'm{' '}
              <span className="text-gradient">G. Manoj</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground mb-4"
            >
              AI Engineer & Data Scientist
            </motion.h2>

            {/* Specialization */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-base md:text-lg text-primary/80 font-medium mb-4"
            >
              Specializing in Computer Vision & LLM Architectures
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Turning complex data into actionable intelligence. Engineering high-accuracy ML models and scalable full-stack AI applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button
                asChild
                size="lg"
                className="btn-glow rounded-full text-base px-8"
              >
                <a href="#projects">
                  <Eye className="w-5 h-5 mr-2" />
                  View AI Projects
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-outline-glow rounded-full text-base px-8"
              >
                <a
                  href="https://drive.google.com/file/d/1XRIA6zIbSIc3_SOWuGFFxlWu9bENJc2h/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-3 rounded-full bg-muted/50 border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center"
          >
            <GlobeVisualization />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <ArrowDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
};
