import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Minus, Maximize2, Send } from 'lucide-react';

interface CommandResponse {
  text: string;
  isTyping?: boolean;
}

const portfolioData = {
  name: 'G. Manoj',
  role: 'AI Engineer & Data Scientist',
  email: 'manojindira2004@gmail.com',
  phone: '+91 7305253038',
  location: 'Chennai, Tamil Nadu, India',
  github: 'https://github.com/gmanoj2005',
  linkedin: 'https://linkedin.com/in/manoj-ganesan-cse',
  education: 'BE in Computer Science, Sri Sairam Engineering College (CGPA: 8.79)',
  skills: {
    primary: ['TensorFlow', 'PyTorch', 'LangChain', 'Computer Vision', 'NLP', 'Deep Learning'],
    secondary: ['React', 'Node.js', 'Flask', 'PostgreSQL', 'Docker', 'AWS'],
    languages: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'SQL'],
  },
  projects: [
    { name: 'SkinScan AI', desc: '97.7% accuracy skin cancer detection - Hackathon Winner' },
    { name: 'AI Agent System', desc: 'Multi-agent task orchestrator with 40% time reduction' },
    { name: 'Phonetic Health', desc: '98% accuracy Parkinson\'s detection - Paper Accepted' },
    { name: 'Match Analytics', desc: '92% accuracy computer vision sports analytics' },
  ],
  achievements: ['₹20,000 Hackathon Winner', 'Research Paper at IconDeepCom 2025', '2000+ Skillrack Problems', '350+ LeetCode Challenges'],
};

const commands: Record<string, () => CommandResponse> = {
  help: () => ({
    text: `Available commands:
    
  about     - Learn about Manoj
  skills    - View technical skills  
  projects  - See featured projects
  contact   - Get contact information
  education - Academic background
  achieve   - Achievements & stats
  resume    - Download resume link
  socials   - Social media links
  clear     - Clear terminal
  
Type a command and press Enter.`,
  }),
  about: () => ({
    text: `👋 Hi! I'm ${portfolioData.name}
    
${portfolioData.role} specializing in Computer Vision and LLM Architectures.

I bridge the gap between theoretical ML models and production-ready applications. With a track record of winning hackathons and solving thousands of algorithmic challenges, I focus on building AI that is both highly accurate and computationally efficient.

Currently pursuing ${portfolioData.education}.`,
  }),
  skills: () => ({
    text: `🛠️ Technical Skills

PRIMARY (AI & Data Science):
  ${portfolioData.skills.primary.join(' • ')}

SECONDARY (Full-Stack & Cloud):
  ${portfolioData.skills.secondary.join(' • ')}

LANGUAGES:
  ${portfolioData.skills.languages.join(' • ')}`,
  }),
  projects: () => ({
    text: `🚀 Featured Projects

${portfolioData.projects.map((p, i) => `${i + 1}. ${p.name}
   ${p.desc}`).join('\n\n')}

View all: ${portfolioData.github}`,
  }),
  contact: () => ({
    text: `📬 Contact Information

📧 Email: ${portfolioData.email}
📱 Phone: ${portfolioData.phone}
📍 Location: ${portfolioData.location}`,
  }),
  education: () => ({
    text: `🎓 Education

${portfolioData.education}

Certifications:
  • IBM Data Science Professional
  • DeepLearning.AI TensorFlow Developer  
  • Google Cloud Computing
  • 6+ NPTEL Honors`,
  }),
  achieve: () => ({
    text: `🏆 Achievements

${portfolioData.achievements.map(a => `• ${a}`).join('\n')}`,
  }),
  resume: () => ({
    text: `📄 Resume

Download/View: https://drive.google.com/file/d/1XRIA6zIbSIc3_SOWuGFFxlWu9bENJc2h/view`,
  }),
  socials: () => ({
    text: `🔗 Social Links

GitHub: ${portfolioData.github}
LinkedIn: ${portfolioData.linkedin}`,
  }),
};

export const TerminalChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output'; text: string }[]>([
    { type: 'output', text: 'Welcome to Manoj\'s Terminal! 🚀\n\nType "help" to see available commands.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    setHistory((prev) => [...prev, { type: 'input', text: `> ${cmd}` }]);

    if (trimmedCmd === 'clear') {
      setHistory([{ type: 'output', text: 'Terminal cleared. Type "help" for commands.' }]);
      return;
    }

    const commandFn = commands[trimmedCmd];
    if (commandFn) {
      const response = commandFn();
      setHistory((prev) => [...prev, { type: 'output', text: response.text }]);
    } else {
      setHistory((prev) => [
        ...prev,
        { type: 'output', text: `Command not found: "${trimmedCmd}"\n\nType "help" to see available commands.` },
      ]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-primary text-primary-foreground shadow-emerald hover:shadow-emerald-glow transition-all ${
          isOpen ? 'hidden' : ''
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Terminal className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '400px',
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md terminal overflow-hidden"
          >
            {/* Header */}
            <div className="terminal-header">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="terminal-dot bg-red-500 hover:brightness-110 transition-all"
                />
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="terminal-dot bg-yellow-500 hover:brightness-110 transition-all"
                />
                <button className="terminal-dot bg-green-500 hover:brightness-110 transition-all" />
              </div>
              <div className="flex-1 text-center text-xs text-muted-foreground font-mono">
                Ask Manoj's Agent
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-muted/50 rounded"
                >
                  <Minus className="w-3 h-3 text-muted-foreground" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-muted/50 rounded"
                >
                  <X className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Body */}
            {!isMinimized && (
              <div className="terminal-body flex flex-col h-[340px]">
                <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 mb-4">
                  {history.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`whitespace-pre-wrap ${
                        item.type === 'input' ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {item.text}
                    </motion.div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex items-center gap-2 border-t border-border/50 pt-3">
                  <span className="text-primary">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a command..."
                    className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50"
                  />
                  <button
                    onClick={() => {
                      if (input.trim()) {
                        handleCommand(input);
                        setInput('');
                      }
                    }}
                    className="p-1.5 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
