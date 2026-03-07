import React from 'react';
import { motion } from 'motion/react';

const sponsors = [
  { name: "QUANTUM", tier: "Title", color: "text-blue-400" },
  { name: "VELOCITY", tier: "Platinum", color: "text-red-500" },
  { name: "APEX", tier: "Platinum", color: "text-green-400" },
  { name: "TURBO", tier: "Gold", color: "text-yellow-400" },
  { name: "GRID", tier: "Gold", color: "text-white" },
  { name: "DRIFT", tier: "Gold", color: "text-purple-400" },
  { name: "IGNITE", tier: "Silver", color: "text-orange-400" },
  { name: "GEAR", tier: "Silver", color: "text-gray-400" },
];

export const Sponsors = () => {
  return (
    <section id="sponsors" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-16 uppercase">
            Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">Partners</span>
        </h2>

        {/* Title Sponsor */}
        <div className="mb-20">
            <span className="text-red-600 font-orbitron font-bold tracking-[0.3em] text-sm uppercase mb-4 block">Title Sponsor</span>
            <motion.div 
                className="w-full max-w-4xl mx-auto h-40 md:h-56 border border-white/10 bg-zinc-900/30 backdrop-blur-md rounded-2xl flex items-center justify-center relative overflow-hidden group hover:border-blue-500/50 transition-colors duration-500 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                whileHover={{ scale: 1.02 }}
            >
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-6xl md:text-8xl font-black font-orbitron tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 group-hover:from-blue-400 group-hover:to-blue-600 transition-all duration-500">
                    QUANTUM
                </h3>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 blur-[60px] rounded-full"></div>
            </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sponsors.slice(1).map((sponsor, index) => (
                <motion.div 
                    key={index}
                    className="h-24 md:h-32 border border-white/5 bg-zinc-900/20 rounded-xl flex items-center justify-center relative overflow-hidden group hover:border-red-600/30 transition-all duration-300"
                    whileHover={{ y: -5 }}
                >
                    <h4 className={`text-xl md:text-3xl font-bold font-orbitron opacity-50 group-hover:opacity-100 transition-opacity duration-300 ${sponsor.color}`}>
                        {sponsor.name}
                    </h4>
                    <span className="absolute bottom-2 right-2 text-[10px] text-gray-600 font-orbitron uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                        {sponsor.tier}
                    </span>
                </motion.div>
            ))}
        </div>

        <div className="mt-20">
            <p className="text-gray-500 font-poppins text-sm mb-6">Interested in partnering with the fastest league?</p>
            <a href="#contact" className="text-white font-orbitron font-bold text-lg border-b-2 border-red-600 hover:text-red-500 transition-colors pb-1">
                Become a Sponsor
            </a>
        </div>
      </div>
    </section>
  );
};
