import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Award, BookOpen, ExternalLink } from 'lucide-react';

interface Education {
  degree: string;
  institution: string;
  period: string;
  score: string;
  scoreLabel: string;
  current?: boolean;
}

const educationData: Education[] = [
  {
    degree: 'Bachelor of Engineering',
    institution: 'Sri Sairam Engineering College, Chennai',
    period: '2022 - 2026',
    score: '8.79',
    scoreLabel: 'CGPA / 10.0',
    current: true,
  },
  {
    degree: 'Higher Secondary (Class XII)',
    institution: 'Bharathi Matriculation Hr. Sec. School',
    period: '2022',
    score: '95%',
    scoreLabel: 'Science Stream',
  },
  {
    degree: 'Secondary (Class X)',
    institution: 'Bharathi Matriculation Hr. Sec. School',
    period: '2020',
    score: '99.4%',
    scoreLabel: 'SSLC',
  },
];

const nptelCourses = [
  'Database Management Systems',
  'Ethical Hacking',
  'Deep Learning',
  'Computer Vision',
  'Blockchain Applications',
  'Natural Language Processing',
];

const professionalCerts = [
  'IBM Data Science Professional Certificate',
  'DeepLearning.AI TensorFlow Developer',
  'Google Cloud Computing Fundamentals',
];

export const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="neural-bg opacity-30" />
      <div className="noise" />

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Education & <span className="text-gradient">Certifications</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Building a strong foundation in Computer Science and AI
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Academic Journey</h3>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

              {educationData.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="relative pl-12 pb-8 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-2.5 top-1.5 w-3 h-3 rounded-full ${
                      edu.current ? 'bg-primary pulse-glow' : 'bg-muted-foreground/50'
                    }`}
                  />

                  {/* Current badge */}
                  {edu.current && (
                    <span className="absolute left-12 -top-1 px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                      Current
                    </span>
                  )}

                  <div className={`glass-card p-5 ${edu.current ? 'mt-4' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gradient">{edu.score}</div>
                        <div className="text-xs text-muted-foreground">{edu.scoreLabel}</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{edu.period}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* NPTEL Honors */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">NPTEL Honors</h3>
              </div>
              <div className="glass-card p-5">
                <div className="grid grid-cols-2 gap-3">
                  {nptelCourses.map((course, index) => (
                    <motion.div
                      key={course}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-muted-foreground">{course}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Professional Certificates */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Professional Certificates</h3>
              </div>
              <div className="glass-card p-5 space-y-3">
                {professionalCerts.map((cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-primary" />
                    <span className="text-sm text-foreground flex-1">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* View Certificates Link */}
            <motion.a
              href="https://drive.google.com/drive/folders/1m8_beJj6Oz5PE0T9pnx4lstzYjanxJW8?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="glass-card p-4 flex items-center justify-between group hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📜</span>
                <span className="font-medium">View All Certificates</span>
              </div>
              <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
