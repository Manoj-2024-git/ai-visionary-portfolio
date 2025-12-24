import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Server, Wrench, Award, Code, Trophy, Medal, BookOpen } from 'lucide-react';

interface Skill {
  name: string;
  icon?: string;
}

interface SkillCategory {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  skills: Skill[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'AI & Data Science',
    subtitle: 'Primary Expertise',
    icon: Brain,
    color: 'from-emerald-500 to-cyan-500',
    skills: [
      { name: 'TensorFlow', icon: '🧠' },
      { name: 'PyTorch', icon: '🔥' },
      { name: 'LangChain', icon: '🔗' },
      { name: 'Scikit-learn', icon: '📊' },
      { name: 'OpenCV', icon: '👁️' },
      { name: 'NLTK', icon: '📝' },
      { name: 'Computer Vision', icon: '🎯' },
      { name: 'NLP', icon: '💬' },
      { name: 'Deep Learning', icon: '🤖' },
    ],
  },
  {
    title: 'Full-Stack & Cloud',
    subtitle: 'Secondary Skills',
    icon: Server,
    color: 'from-blue-500 to-purple-500',
    skills: [
      { name: 'React', icon: '⚛️' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'Flask', icon: '🌶️' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'Docker', icon: '🐳' },
      { name: 'AWS', icon: '☁️' },
      { name: 'Flutter', icon: '🦋' },
      { name: 'REST APIs', icon: '🔌' },
    ],
  },
  {
    title: 'Tools & Platforms',
    subtitle: 'Proficient With',
    icon: Wrench,
    color: 'from-orange-500 to-yellow-500',
    skills: [
      { name: 'Tableau', icon: '📈' },
      { name: 'Power BI', icon: '📊' },
      { name: 'Git', icon: '📦' },
      { name: 'Agile', icon: '🔄' },
      { name: 'Pandas', icon: '🐼' },
      { name: 'NumPy', icon: '🔢' },
      { name: 'Jupyter', icon: '📓' },
    ],
  },
];

const programmingLanguages = [
  { name: 'Python', icon: '🐍' },
  { name: 'Java', icon: '☕' },
  { name: 'JavaScript', icon: '🟨' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'C', icon: '©️' },
  { name: 'C++', icon: '➕' },
  { name: 'SQL', icon: '🗃️' },
  { name: 'Dart', icon: '🎯' },
];

const codingStats = [
  {
    icon: Trophy,
    value: '2000+',
    label: 'Problems Solved',
    platform: 'Skillrack',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: Code,
    value: '350+',
    label: 'LeetCode Challenges',
    platform: 'LeetCode',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: Medal,
    value: '6+',
    label: 'NPTEL Certifications',
    platform: 'NPTEL',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: BookOpen,
    value: '8.79',
    label: 'CGPA',
    platform: 'Academic',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="grid-pattern opacity-50" />
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
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Comprehensive expertise across multiple domains and technologies
          </p>
        </motion.div>

        {/* Programming Languages Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 overflow-hidden"
        >
          <p className="text-sm text-muted-foreground text-center mb-4 uppercase tracking-wider">
            Programming Languages
          </p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex gap-6 animate-marquee">
              {[...programmingLanguages, ...programmingLanguages].map((lang, index) => (
                <div
                  key={`${lang.name}-${index}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-muted/50 border border-border whitespace-nowrap hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <span className="text-xl">{lang.icon}</span>
                  <span className="font-medium">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + categoryIndex * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} bg-opacity-20`}>
                  <category.icon className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                  <p className="text-xs text-muted-foreground">{category.subtitle}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="skill-badge flex items-center gap-1.5"
                  >
                    <span className="text-sm">{skill.icon}</span>
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coding Excellence Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <Award className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="text-xl font-semibold">Coding Excellence</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {codingStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="glass-card p-5 text-center relative overflow-hidden group"
              >
                <div className={`p-3 rounded-full ${stat.bgColor} w-fit mx-auto mb-3`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className={`text-xs ${stat.color} mt-1`}>{stat.platform}</div>
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certificates Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-12 text-center"
        >
          <a
            href="https://drive.google.com/drive/folders/1m8_beJj6Oz5PE0T9pnx4lstzYjanxJW8?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all group"
          >
            <span>📜</span>
            <span>View All Certificates</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
