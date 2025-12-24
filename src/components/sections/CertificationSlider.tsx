import { motion } from 'framer-motion';
import { useRef } from 'react';

const certifications = [
  { name: 'IBM', logo: '🔵' },
  { name: 'Google Cloud', logo: '☁️' },
  { name: 'NPTEL', logo: '📚' },
  { name: 'Coursera', logo: '🎓' },
  { name: 'TensorFlow', logo: '🧠' },
  { name: 'DeepLearning.AI', logo: '🤖' },
];

export const CertificationSlider = () => {
  return (
    <section className="relative py-12 overflow-hidden bg-muted/20 border-y border-border/50">
      <div className="container mx-auto px-4 mb-6">
        <p className="text-center text-sm text-muted-foreground uppercase tracking-wider">
          Certified By Leading Platforms
        </p>
      </div>

      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling container */}
        <div className="flex animate-marquee">
          {[...certifications, ...certifications, ...certifications].map((cert, index) => (
            <motion.div
              key={`${cert.name}-${index}`}
              className="flex items-center gap-3 px-8 py-4 mx-4 rounded-xl bg-card/50 border border-border/50 whitespace-nowrap hover:border-primary/30 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-3xl">{cert.logo}</span>
              <span className="font-semibold text-foreground">{cert.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
