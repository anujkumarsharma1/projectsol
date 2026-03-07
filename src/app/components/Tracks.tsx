import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Zap, Flag, Timer } from 'lucide-react';

const tracks = [
  {
    id: 1,
    name: "Neon Marina",
    category: "Street Circuit",
    length: "5.06 km",
    turns: 23,
    image: "https://images.unsplash.com/photo-1686426781747-7cd27a8e05a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwcmFjZSUyMHRyYWNrJTIwbmlnaHQlMjBsaWdodHN8ZW58MXx8fHwxNzcxNDE3NzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    name: "Cyber Dunes",
    category: "Endurance",
    length: "7.12 km",
    turns: 18,
    image: "https://images.unsplash.com/photo-1763805508094-901f2a79ff77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJib24lMjBmaWJlciUyMHRleHR1cmUlMjBkYXJrfGVufDF8fHx8MTc3MTM4Mjc2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    name: "Orbital Ring",
    category: "Speed",
    length: "4.30 km",
    turns: 12,
    image: "https://images.unsplash.com/photo-1760456015398-c0119ffb0593?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmMSUyMHJhY2luZyUyMGNhciUyMHNwZWVkaW5nfGVufDF8fHx8MTc3MTQxNzcxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    name: "Midnight Tokyo",
    category: "Drift",
    length: "3.80 km",
    turns: 28,
    image: "https://images.unsplash.com/photo-1686426781747-7cd27a8e05a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwcmFjZSUyMHRyYWNrJTIwbmlnaHQlMjBsaWdodHN8ZW58MXx8fHwxNzcxNDE3NzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export const Tracks = () => {
  return (
    <section id="tracks" className="py-24 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
                <h2 className="text-5xl md:text-7xl font-orbitron font-black uppercase tracking-tighter mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Legendary</span> <br />
                    <span className="text-red-600">Circuits</span>
                </h2>
                <div className="h-1 w-32 bg-red-600 skew-x-[-20deg]"></div>
            </div>
            <p className="max-w-md text-gray-400 font-poppins mt-6 md:mt-0 text-right">
                Master every corner, dominate every straight. Our tracks are designed to push physics to the limit.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tracks.map((track) => (
                <motion.div 
                    key={track.id}
                    className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/10"
                    whileHover={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={track.image} 
                            alt={track.name} 
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    </div>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-red-500 font-orbitron font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                                    <Zap className="w-4 h-4" /> {track.category}
                                </span>
                                <motion.div 
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    initial={{ x: -20 }}
                                    whileInView={{ x: 0 }}
                                >
                                    <Flag className="w-6 h-6 text-white" />
                                </motion.div>
                            </div>
                            
                            <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4 group-hover:text-red-500 transition-colors">
                                {track.name}
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                <div>
                                    <span className="text-gray-500 text-xs uppercase block mb-1">Length</span>
                                    <span className="text-white font-bold font-orbitron flex items-center gap-2"><MapPin className="w-4 h-4 text-red-600" /> {track.length}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-xs uppercase block mb-1">Turns</span>
                                    <span className="text-white font-bold font-orbitron flex items-center gap-2"><Timer className="w-4 h-4 text-red-600" /> {track.turns}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Border Animation */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-600/50 rounded-2xl transition-all duration-500 z-20"></div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
