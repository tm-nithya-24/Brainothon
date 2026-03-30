import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { motion } from 'framer-motion';
import { LogOut, Brain, HelpCircle, Crown, Trophy, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';

function Navbar({ isDark, toggleTheme }: { isDark: boolean, toggleTheme: () => void }) {
  const { user, logout } = useAuth();
  
  return (
    <nav className="glass sticky top-0 z-[100] px-8 py-5 flex justify-between items-center text-white border-b border-white/5 mx-6 mt-4 rounded-2xl">
      <Link to="/" className="flex items-center gap-3 text-3xl font-black brand-font hover:scale-105 transition duration-500 tracking-tight">
        <div className="relative group">
          <div className="bg-gradient-to-br from-fuchsia-600 to-indigo-600 p-2 rounded-xl shadow-2xl shadow-fuchsia-500/40 border border-white/10">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <HelpCircle className="absolute -top-2 -right-2 w-5 h-5 text-amber-400 fill-amber-400/20 animate-bounce" />
        </div>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-500 drop-shadow-md">
          BRAINOTHON
        </span>
      </Link>
      <div className="flex items-center gap-6 font-semibold">
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 text-amber-400"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-indigo-400" />}
        </button>
        <Link to="/leaderboard" className="flex items-center gap-2 font-medium hover:text-cyan-400 transition-colors duration-300">
          <Crown className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]"/>
          LEADERBOARD
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" className="flex items-center gap-2 hover:text-fuchsia-400 ring-1 ring-white/10 px-4 py-2 rounded-xl bg-white/5 transition-all duration-300 hover:bg-white/10 shadow-lg">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="font-bold">{user.username}</span> 
              <span className="text-fuchsia-400 font-mono text-sm border-l border-white/10 pl-2">{user.xp} XP</span>
            </Link>
            <button onClick={logout} className="p-2 rounded-full hover:bg-slate-700/50 transition">
              <LogOut className="w-5 h-5" />
            </button>
          </>
        ) : (
          <Link to="/" className="btn-cyber px-8 py-2.5 rounded-xl font-bold text-lg shadow-xl tracking-tight">Access Node</Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Router>
      <AuthProvider>
        <div className={`min-h-screen ${isDark ? 'text-slate-100' : 'text-slate-900'} flex flex-col font-sans selection:bg-fuchsia-500/30 selection:text-white transition-colors duration-500`}>
          <div className="nebula-container">
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
          </div>
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />
          <motion.main 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-grow container mx-auto px-6 py-12 relative z-10"
          >
            <div className="absolute top-[-15rem] left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </motion.main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
