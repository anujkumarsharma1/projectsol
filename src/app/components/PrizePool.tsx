import React from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { Trophy, Award, Medal } from 'lucide-react';

const data = [
  { name: '1st Place', value: 50000, color: '#FFD700' }, // Gold
  { name: '2nd Place', value: 25000, color: '#C0C0C0' }, // Silver
  { name: '3rd Place', value: 10000, color: '#CD7F32' }, // Bronze
  { name: '4th - 10th', value: 15000, color: '#FF0000' }, // Red
];

const COLORS = ['#FFD700', '#C0C0C0', '#CD7F32', '#EF4444'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-white/20 p-4 rounded shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <p className="font-orbitron text-white text-lg font-bold">{payload[0].name}</p>
        <p className="font-poppins text-red-500 font-semibold">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export const PrizePool = () => {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden flex flex-col items-center">
      {/* Metallic Texture Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1763805508094-901f2a79ff77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJib24lMjBmaWJlciUyMHRleHR1cmUlMjBkYXJrfGVufDF8fHx8MTc3MTM4Mjc2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')",
            backgroundSize: 'cover'
        }}
      ></div>
      
      <div className="relative z-10 text-center mb-12">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-4 uppercase tracking-tighter">
                $100,000 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600">Prize Pool</span>
            </h2>
            <p className="text-gray-400 font-poppins text-lg max-w-2xl mx-auto">
                Competing for glory and the ultimate reward. The stakes have never been higher.
            </p>
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Chart */}
        <div className="h-[400px] w-full relative min-w-0" style={{ minHeight: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={140}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]} 
                                className="hover:opacity-80 transition-opacity duration-300 outline-none filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                            />
                        ))}
                        <Label
                            value="REWARDS"
                            position="center"
                            className="font-orbitron font-bold text-white text-xl fill-white"
                        />
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
            {/* Glow effect behind chart */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/20 blur-[100px] -z-10 rounded-full"></div>
        </div>

        {/* Breakdown List */}
        <div className="flex flex-col gap-6">
            <motion.div 
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-900/20 to-transparent border-l-4 border-yellow-400 backdrop-blur-sm rounded-r-lg"
                whileHover={{ scale: 1.02, x: 10 }}
            >
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/50">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                    <h4 className="font-orbitron font-bold text-white text-xl">CHAMPION</h4>
                    <span className="text-yellow-400 font-bold text-2xl">$50,000</span>
                </div>
            </motion.div>

            <motion.div 
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-800/20 to-transparent border-l-4 border-gray-400 backdrop-blur-sm rounded-r-lg"
                whileHover={{ scale: 1.02, x: 10 }}
            >
                <div className="w-12 h-12 rounded-full bg-gray-500/20 flex items-center justify-center border border-gray-500/50">
                    <Medal className="w-6 h-6 text-gray-300" />
                </div>
                <div>
                    <h4 className="font-orbitron font-bold text-white text-xl">RUNNER UP</h4>
                    <span className="text-gray-300 font-bold text-2xl">$25,000</span>
                </div>
            </motion.div>

            <motion.div 
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-900/20 to-transparent border-l-4 border-orange-600 backdrop-blur-sm rounded-r-lg"
                whileHover={{ scale: 1.02, x: 10 }}
            >
                <div className="w-12 h-12 rounded-full bg-orange-600/20 flex items-center justify-center border border-orange-600/50">
                    <Award className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                    <h4 className="font-orbitron font-bold text-white text-xl">3RD PLACE</h4>
                    <span className="text-orange-500 font-bold text-2xl">$10,000</span>
                </div>
            </motion.div>

            <div className="mt-4 p-4 border border-white/10 rounded-lg bg-white/5 text-center">
                <p className="text-gray-400 font-poppins text-sm">
                    Plus <span className="text-white font-bold">Exclusive Sponsorship Deals</span> for top 10 finalists.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};
