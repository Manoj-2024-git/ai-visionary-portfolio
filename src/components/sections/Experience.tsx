import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Calendar, Building2, Code, Database, LineChart, Globe } from 'lucide-react';

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  icon: React.ElementType;
}

const experiences: Experience[] = [
  {
    role: 'Data Science Intern',
    company: 'EPIC Groups',
    location: 'Chennai',
    period: 'June 2025 – July 2025',
    description: [
      'Engineered a comprehensive inventory analytics dashboard using Python (Pandas) and Tableau, featuring customizable stock alerts and real-time visualization',
      'Analyzed historical procurement data to implement cost analytics features, directly reducing stock discrepancies by 25% through improved forecasting accuracy',
    ],
    technologies: ['Python', 'Pandas', 'Tableau', 'Analytics', 'Data Visualization'],
    icon: LineChart,
  },
  {
    role: 'Web Development Intern',
    company: 'International Campus Masters (ICM)',
    location: 'Chennai',
    period: 'June 2024 – July 2024',
    description: [
      'Revamped the architecture of a real-time web application using the MERN Stack, streamlining operations and reducing processing time by 25%',
      'Integrated robust PostgreSQL databases and Flask-based RESTful APIs, boosting student data exchange speed by 10%',
      'Collaborated with a development team to deploy the solution, ensuring cross-browser compatibility and responsive design',
    ],
    technologies: ['MERN Stack', 'PostgreSQL', 'Flask', 'REST APIs', 'Docker'],
    icon: Code,
  },
];

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="grid-pattern opacity-30" />
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
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Hands-on experience through impactful internships
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%] md:ml-auto'
              }`}
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.2 }}
                className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 z-10 ${
                  index === 0 ? 'top-8' : 'top-8'
                }`}
                style={{ boxShadow: '0 0 20px hsl(160 84% 39% / 0.5)' }}
              />

              {/* Card */}
              <div
                className={`glass-card p-6 md:p-8 ml-10 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                }`}
              >
                {/* Header */}
                <div className={`flex items-start gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <exp.icon className="w-6 h-6" />
                  </div>
                  <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                    <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-primary mt-1">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className={`flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Description */}
                <ul className={`space-y-3 mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex gap-2">
                      <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                      <span className={index % 2 === 0 ? 'md:text-right' : ''}>{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-secondary/50 text-secondary-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
