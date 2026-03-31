import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Crown, Medal } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

type LeaderboardEntry = {
  username: string;
  xp: number;
};

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`${API_URL}/leaderboard`);
        setLeaders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500"></div></div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="text-center mb-12 flex flex-col items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
          <Crown className="relative w-20 h-20 text-yellow-400 mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
        </div>
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-500 mb-4 drop-shadow-md">
          Neural Leaderboard
        </h1>
        <p className="text-slate-400 text-lg max-w-md">Top 10 synapses worldwide. Optimize your knowledge and climb the global ranking!</p>
      </div>

      <div className="glass rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/80 border-b border-fuchsia-500/20">
              <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-widest text-xs">Rank</th>
              <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-widest text-xs">Synapse ID</th>
              <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-widest text-xs text-right">Processed XP</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, idx) => (
              <motion.tr 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className="border-b border-slate-800/50 hover:bg-slate-800/30 transition group"
              >
                <td className="px-6 py-6 font-bold text-xl">
                  {idx === 0 && <span className="text-yellow-400 flex items-center gap-2 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"><Medal className="w-6 h-6"/> 1st</span>}
                  {idx === 1 && <span className="text-slate-300 flex items-center gap-2">2nd</span>}
                  {idx === 2 && <span className="text-amber-600 flex items-center gap-2">3rd</span>}
                  {idx > 2 && <span className="text-slate-500 pl-2">#{idx + 1}</span>}
                </td>
                <td className="px-6 py-6 font-bold text-lg text-fuchsia-50 group-hover:text-fuchsia-400 transition-colors duration-300">
                  {leader.username}
                </td>
                <td className="px-6 py-6 text-right font-mono font-bold text-indigo-400 text-xl group-hover:text-indigo-300 transition-colors duration-300">
                  {leader.xp.toLocaleString()}
                </td>
              </motion.tr>
            ))}
            {leaders.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-slate-400">No players found. Be the first to join!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
