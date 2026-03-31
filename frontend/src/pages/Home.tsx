import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, HelpCircle, LogIn, UserPlus } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function Home() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);
        const res = await axios.post(`${API_URL}/token`, formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        
        // Fetch user data
        const profileRes = await axios.get(`${API_URL}/score`, {
          headers: { Authorization: `Bearer ${res.data.access_token}` }
        });
        
        login(res.data.access_token, profileRes.data);
      } else {
        await axios.post(`${API_URL}/signup`, { username, email, password });
        setIsLogin(true); // switch to login after successful signup
        setError('Signup successful! Please login.');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred');
    }
  };

  if (user) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
      >
        <div className="relative mb-12 group scale-110">
          <div className="absolute -inset-16 bg-fuchsia-600/20 rounded-full blur-[80px] animate-pulse"></div>
          <div className="relative bg-black/40 backdrop-blur-2xl p-14 rounded-[3.5rem] border border-white/5 shadow-2xl">
            <Brain className="w-40 h-40 text-white drop-shadow-[0_0_40px_rgba(217,70,239,0.7)]" />
            <motion.div 
               animate={{ y: [0, -15, 0], opacity: [0.7, 1, 0.7] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-4 right-4"
            >
              <HelpCircle className="w-16 h-16 text-amber-400 fill-amber-400/20" />
            </motion.div>
          </div>
        </div>
        <h1 className="text-[10rem] font-black mb-8 brand-font tracking-tighter drop-shadow-[0_0_40px_rgba(0,0,0,0.5)] leading-none text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-indigo-100 to-fuchsia-500">
            BRAINOTHON
          </span>
        </h1>
        <p className="text-2xl text-slate-400 mb-12 max-w-2xl font-light leading-relaxed">
          The neural network is primed. Challenge your synapses with the next generation of knowledge synthesis.
        </p>
        <p className="text-xl text-slate-400 mb-8 max-w-lg">
          Ready to challenge your brain? Jump into the next quiz and climb the leaderboard!
        </p>
        <button 
          onClick={() => navigate('/quiz')}
          className="btn-cyber text-2xl px-14 py-5 rounded-2xl font-extrabold uppercase tracking-widest transition-all duration-500"
        >
          Initialize Synchronization 🚀
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass p-8 rounded-2xl w-full max-w-md"
      >
        <div className="flex justify-center mb-6 relative group">
          <div className="bg-gradient-to-br from-fuchsia-600 to-indigo-600 p-4 rounded-3xl shadow-xl border border-white/10">
            <Brain className="w-16 h-16 text-white" />
          </div>
          <HelpCircle className="absolute -top-3 -right-3 w-8 h-8 text-amber-400 fill-amber-400/20 animate-bounce" />
        </div>
        <h2 className="text-4xl font-black mb-10 text-center brand-font tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-800">
            BRAINOTHON CORE
          </span>
        </h2>
        
        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}
        
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Username</label>
            <input 
              required
              className="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-xl outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Email</label>
              <input 
                type="email"
                required
                className="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-xl outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Password</label>
            <input 
              type="password"
              required
              className="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-xl outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="btn-cyber w-full py-4 rounded-xl font-black text-xl flex justify-center items-center gap-3 transition-all duration-500 shadow-2xl"
          >
            {isLogin ? <><LogIn className="w-6 h-6"/> Access Network</> : <><UserPlus className="w-6 h-6"/> Create Identity</>}
          </button>
        </form>
        
        <div className="mt-6 text-center text-slate-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            className="text-fuchsia-400 hover:text-fuchsia-300 hover:underline font-semibold"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
