import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Award, Zap, BarChart2, Radio } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [socketMsg, setSocketMsg] = useState('');

  useEffect(() => {
    if (!user) return;
    const ws = new WebSocket(`ws://localhost:8000/ws/${user.username}`);
    ws.onmessage = (event) => {
      setSocketMsg(event.data);
    };
    return () => ws.close();
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-black brand-font text-gradient drop-shadow-2xl tracking-tighter">
          Neural Node Dashboard
        </h1>
        {socketMsg && (
          <div className="flex items-center gap-2 bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm shadow-xl animate-pulse">
            <Radio className="w-4 h-4 text-emerald-500" />
            <span className="truncate max-w-[200px]">{socketMsg}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <motion.div whileHover={{ y: -8 }} className="glass-card p-10 rounded-3xl flex items-center gap-6 border-l-4 border-indigo-500 shadow-xl group">
          <div className="bg-indigo-500/15 p-5 rounded-2xl group-hover:bg-indigo-500/25 transition-colors">
            <Zap className="w-10 h-10 text-indigo-400" />
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-black opacity-80">Accumulated XP</p>
            <h2 className="text-4xl font-black font-mono text-white tracking-tight">{user.xp}</h2>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -8 }} className="glass-card p-10 rounded-3xl flex items-center gap-6 border-l-4 border-fuchsia-500 shadow-xl group">
          <div className="bg-fuchsia-500/15 p-5 rounded-2xl group-hover:bg-fuchsia-500/25 transition-colors">
            <Award className="w-10 h-10 text-fuchsia-400" />
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-black opacity-80">Rank Index</p>
            <h2 className="text-4xl font-black font-mono text-white tracking-tight">Lvl {Math.max(1, Math.floor(user.xp / 100))}</h2>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -8 }} className="glass-card p-10 rounded-3xl flex items-center gap-6 border-l-4 border-cyan-500 shadow-xl group">
          <div className="bg-cyan-500/15 p-5 rounded-2xl group-hover:bg-cyan-500/25 transition-colors">
            <BarChart2 className="w-10 h-10 text-cyan-400" />
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-black opacity-80">Sync Quality</p>
            <h2 className="text-4xl font-black font-mono text-white tracking-tight">--%</h2>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="text-yellow-500" /> Your Achievements
          </h3>
          <div className="space-y-4">
            <div className="bg-slate-900/60 p-4 rounded-xl flex items-center gap-4 border border-fuchsia-500/30">
              <div className="bg-gradient-to-br from-fuchsia-500 to-indigo-500 p-2 rounded-full shadow-[0_0_10px_rgba(217,70,239,0.5)]"><Award className="text-white w-6 h-6" /></div>
              <div>
                <h4 className="font-bold text-slate-200">Neural Ignition</h4>
                <p className="text-sm text-slate-400">Answered your first query</p>
              </div>
            </div>
            {user.xp >= 100 && (
              <div className="bg-slate-900/60 p-4 rounded-xl flex items-center gap-4 border border-cyan-500/30">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-2 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"><Zap className="text-white w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-slate-200">Data Streamer</h4>
                  <p className="text-sm text-slate-400">Reached 100 XP threshold</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="glass p-8 rounded-3xl">
          <h3 className="text-2xl font-bold mb-6">Brain Diagnostics</h3>
          <p className="text-slate-300 mb-6 bg-slate-900/80 p-4 rounded-xl border-l-4 border-fuchsia-500 shadow-inner">
            "Focus more on <span className="text-fuchsia-400 font-bold">React Hooks</span>. Your retention there is 40%."
          </p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1 text-slate-300 font-semibold">
                <span>FastAPI Routing</span>
                <span className="text-emerald-400">80%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 border border-slate-700">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1 text-slate-300 font-semibold">
                <span>React Hooks</span>
                <span className="text-fuchsia-400">40%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 border border-slate-700">
                <div className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-400 h-2.5 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1 text-slate-300 font-semibold">
                <span>Python Mechanics</span>
                <span className="text-cyan-400">95%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 border border-slate-700">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
