import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Brain, Zap, Medal } from 'lucide-react';

const API_URL = 'http://localhost:8000';

type Question = {
  id: number;
  question_text: string;
  options: string[];
  correct_answer: string;
  category: string;
  difficulty: string;
  explanation: string;
};

export default function Quiz() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean, eli5: string, detailed: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    if (!selectedCategory) return;

    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${API_URL}/questions?category=${selectedCategory}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, [user, navigate, token, selectedCategory]);

  useEffect(() => {
    if (timeLeft > 0 && !selectedOption && !isFinished && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !selectedOption && !isFinished) {
      handleTimeOut();
    }
  }, [timeLeft, selectedOption, isFinished, questions]);

  const handleTimeOut = () => {
    // Treat as incorrect
    setFeedback({
      isCorrect: false,
      eli5: "Time's up! You have to be faster next time.",
      detailed: `The correct answer was: ${questions[currentIndex].correct_answer}`
    });
  };

  const submitAnswer = async (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    try {
      const q = questions[currentIndex];
      const res = await axios.post(`${API_URL}/submit?question_id=${q.id}&answer=${encodeURIComponent(option)}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFeedback({
        isCorrect: res.data.correct,
        eli5: res.data.eli5,
        detailed: res.data.detailed
      });
      if (res.data.correct) {
        setScore((prev) => prev + res.data.xp_gained);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
      setTimeLeft(15);
    } else {
      setIsFinished(true);
    }
  };

  if (!selectedCategory) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center py-10 text-center max-w-6xl mx-auto"
      >
        <div className="mb-8">
           <h2 className="text-6xl font-black mb-4 brand-font text-gradient tracking-tighter">
            Neural Pathways
          </h2>
          <p className="text-xl text-slate-400 font-light">Select a stream to initialize knowledge synchronization</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-6">
          <button onClick={() => setSelectedCategory('Python')} className="glass-card group p-10 rounded-[2rem] border border-white/5 hover:border-indigo-500/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Brain className="text-indigo-400 w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-indigo-100 brand-font">Python</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Core primitives, asynchronous patterns, and advanced data structures.</p>
            </div>
          </button>
          
          <button onClick={() => setSelectedCategory('React')} className="glass-card group p-10 rounded-[2rem] border border-white/5 hover:border-cyan-500/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Zap className="text-cyan-400 w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-cyan-100 brand-font">React</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Modern hooks, concurrent rendering, and architectural patterns.</p>
            </div>
          </button>

          <button onClick={() => setSelectedCategory('HTML')} className="glass-card group p-10 rounded-[2rem] border border-white/5 hover:border-orange-500/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Medal className="text-orange-400 w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-orange-100 brand-font">Web Build</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Semantic architecture, accessibility, and modern HTML5 APIs.</p>
            </div>
          </button>

          <button onClick={() => setSelectedCategory('FastAPI')} className="glass-card group p-10 rounded-[2rem] border border-white/5 hover:border-emerald-500/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <div className="text-emerald-400 font-black text-xl">API</div>
              </div>
              <h3 className="text-3xl font-bold mb-3 text-emerald-100 brand-font">FastAPI</h3>
              <p className="text-slate-400 text-sm leading-relaxed">High-performance async services and automated documentation.</p>
            </div>
          </button>

          <button onClick={() => setSelectedCategory('Postgres')} className="glass-card group p-10 rounded-[2rem] border border-white/5 hover:border-blue-500/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <div className="text-blue-400 font-black text-xl">DB</div>
              </div>
              <h3 className="text-3xl font-bold mb-3 text-blue-100 brand-font">Postgres</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Relational integrity, ACID compliance, and advanced indexing.</p>
            </div>
          </button>
        </div>
      </motion.div>
    );
  }

  if (questions.length === 0 && !isFinished) {
    return <div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;
  }

  if (isFinished) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass p-12 rounded-3xl text-center max-w-2xl mx-auto mt-20"
      >
        <TrophyIcon className="mx-auto w-24 h-24 text-yellow-500 mb-6" />
        <h2 className="text-4xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-2xl mb-8">You earned <span className="font-bold text-blue-400">{score} XP</span></p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-full font-bold text-lg transition"
        >
          View Dashboard
        </button>
      </motion.div>
    );
  }

  const q = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <span className="text-slate-400 font-medium">Synapse {currentIndex + 1} of {questions.length}</span>
        <div className={`flex items-center gap-2 font-bold text-xl px-4 py-2 rounded-full border shadow-lg ${timeLeft <= 5 ? 'bg-red-500/20 border-red-500/50 text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition duration-300' : 'bg-slate-800/80 border-fuchsia-500/30 text-fuchsia-100 hover:shadow-[0_0_15px_rgba(192,38,211,0.3)]'}`}>
          <Clock className={`w-5 h-5 ${timeLeft <= 5 ? 'animate-pulse' : ''}`} />
          {timeLeft}s
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="glass p-8 rounded-2xl mb-8 border-l-4 border-fuchsia-500 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-bl-full blur-2xl pointer-events-none" />
          <div className="flex gap-2 mb-4 relative z-10">
            <span className="bg-slate-700 text-xs px-2 py-1 rounded text-slate-300 uppercase tracking-widest">{q.category}</span>
            <span className={`text-xs px-2 py-1 rounded text-white uppercase tracking-widest ${q.difficulty === 'easy' ? 'bg-emerald-600' : q.difficulty === 'medium' ? 'bg-yellow-600' : 'bg-red-600'}`}>
              {q.difficulty}
            </span>
          </div>
          <h2 className="text-4xl font-black mb-8 leading-[1.1] brand-font text-white drop-shadow-sm tracking-tight">{q.question_text}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {q.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              let btnClass = "p-5 rounded-2xl text-left font-semibold transition-all duration-500 border relative overflow-hidden group ";
              
              if (!selectedOption && !feedback) {
                btnClass += "border-white/10 bg-white/5 hover:border-fuchsia-500/50 hover:bg-fuchsia-500/10 hover:shadow-[0_0_20px_rgba(217,70,239,0.1)]";
              } else if (feedback) {
                if (option === q.correct_answer) {
                  btnClass += "border-emerald-500/50 bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]";
                } else if (isSelected && !feedback.isCorrect) {
                  btnClass += "border-red-500/50 bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.15)]";
                } else {
                  btnClass += "border-white/5 bg-white/5 opacity-40";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => submitAnswer(option)}
                  disabled={!!selectedOption || !!feedback}
                  className={btnClass}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-700 pointer-events-none" />
                  <div className="flex justify-between items-center relative z-10">
                    {option}
                    {feedback && option === q.correct_answer && <CheckCircle className="text-emerald-500" />}
                    {feedback && isSelected && !feedback.isCorrect && <XCircle className="text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Feedback Section */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl ${feedback.isCorrect ? 'bg-emerald-900/40 border border-emerald-500/30' : 'bg-red-900/40 border border-red-500/30'}`}
          >
            <h3 className={`text-2xl font-bold flex items-center gap-2 mb-2 ${feedback.isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
              {feedback.isCorrect ? <CheckCircle /> : <XCircle />}
              {feedback.isCorrect ? 'Awesome! 🚀' : 'Not quite! 😅'}
            </h3>
            <p className="text-lg font-bold mb-1 text-slate-200">{feedback.eli5}</p>
            <p className="text-slate-400 mb-6">{feedback.detailed}</p>
            
            <button
              onClick={handleNext}
              className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition"
            >
              Next Question &rarr;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TrophyIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
