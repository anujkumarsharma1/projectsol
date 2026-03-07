import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Flag, ShieldCheck, Trophy, Gauge } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Registration",
    description: "Sign up and build your driver profile. Secure your spot in the qualifiers.",
    icon: ShieldCheck,
    date: "Feb 01 - Feb 28"
  },
  {
    id: 2,
    title: "Qualifiers",
    description: "Time trials to determine the grid positions. Only the fastest proceed.",
    icon: Gauge,
    date: "Mar 05 - Mar 10"
  },
  {
    id: 3,
    title: "Semi-Finals",
    description: "Head-to-head races in groups. The top 3 from each group advance.",
    icon: Flag,
    date: "Mar 20 - Mar 25"
  },
  {
    id: 4,
    title: "Grand Final",
    description: "The ultimate showdown for the championship title and the prize pool.",
    icon: Trophy,
    date: "Apr 15"
  }
];

export const RacingJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6" ref={containerRef}>
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4 uppercase">
                The <span className="text-red-600">Journey</span> to Glory
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-poppins">
                From rookie to legend. Every champion starts somewhere. Here is your path to the podium.
            </p>
        </div>

        <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-zinc-800 z-0 rounded-full"></div>
            
            {/* Animated Progress Line */}
            <motion.div 
                style={{ height: progressHeight }}
                className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-600 z-10 rounded-full origin-top"
            />

            <div className="flex flex-col gap-24 relative z-20">
                {steps.map((step, index) => (
                    <motion.div 
                        key={step.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ margin: "-100px" }}
                        className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} justify-between gap-8 md:gap-16`}
                    >
                        {/* Content */}
                        <div className={`w-[45%] ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                            <div className="mb-2">
                                <span className="text-red-500 font-orbitron font-bold text-sm tracking-widest uppercase mb-1 block">
                                    {step.date}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 font-poppins text-sm md:text-base leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>

                        {/* Icon Node */}
                        <div className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 shrink-0">
                            <div className="w-full h-full bg-zinc-900 border-2 border-zinc-700 rounded-full flex items-center justify-center z-20 group hover:border-red-500 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                <step.icon className="w-5 h-5 md:w-8 md:h-8 text-white group-hover:text-red-500 transition-colors" />
                            </div>
                            <div className="absolute inset-0 bg-zinc-950 w-20 h-20 -z-10 rounded-full"></div> {/* Mask line behind node */}
                        </div>

                        {/* Spacer for layout balance */}
                        <div className="w-[45%] hidden md:block"></div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};
