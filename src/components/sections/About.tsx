import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, Trophy, Target, Cpu, Database, Cloud, Code } from 'lucide-react';

const stats = [
  { icon: GraduationCap, label: 'Education', value: 'BE in CS', subtext: 'CGPA 8.79/10.0' },
  { icon: Briefcase, label: 'Experience', value: '2 Internships', subtext: 'Data Science & Web Dev' },
  { icon: Trophy, label: 'Achievement', value: '₹20,000 Prize', subtext: '24hr Hackathon Winner' },
];

const focusAreas = [
  { icon: Cpu, label: 'Computer Vision', description: 'Image recognition, object detection, medical imaging' },
  { icon: Database, label: 'LLM Architectures', description: 'Multi-agent systems, prompt engineering, RAG' },
  { icon: Cloud, label: 'ML Ops', description: 'Model deployment, monitoring, scalable pipelines' },
  { icon: Code, label: 'Full-Stack AI', description: 'End-to-end AI application development' },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute inset-0 neural-bg opacity-50" />
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
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Passionate About Transforming Data into Intelligence
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left content - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold text-gradient mb-4">
                Building the Intelligence Layer of Modern Apps
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I am a <span className="text-foreground font-medium">Data Science focused Engineer</span> dedicated to bridging the gap between theoretical ML models and production-ready applications.
                </p>
                <p>
                  With a track record of <span className="text-primary">winning hackathons</span> and solving <span className="text-primary">thousands of algorithmic challenges</span>, I focus on building AI that is both highly accurate and computationally efficient.
                </p>
                <p>
                  Currently pursuing my Bachelor's in Computer Science at Sri Sairam Engineering College with a <span className="text-foreground font-medium">CGPA of 8.79</span>, I'm constantly expanding my knowledge in cloud computing and emerging technologies.
                </p>
              </div>
            </div>

            {/* Focus Areas */}
            <div className="grid grid-cols-2 gap-4">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={area.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="glass-card p-4 group hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <area.icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm">{area.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{area.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right content - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-6 flex items-center gap-5"
                >
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.subtext}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quote/Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="glass-card p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-primary/10 to-transparent" />
              <Target className="w-8 h-8 text-primary mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">Mission</p>
              <p className="text-muted-foreground">
                To leverage AI and data science to create meaningful impact in the tech industry, building systems that are not just intelligent, but also accessible and ethical.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
