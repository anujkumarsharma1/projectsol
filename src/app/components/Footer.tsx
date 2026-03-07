import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
        <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-6 group w-fit">
                <div className="w-8 h-8 bg-red-600 skew-x-[-15deg] flex items-center justify-center border border-white/10">
                    <span className="font-orbitron font-bold text-white text-lg transform skew-x-[15deg]">F1</span>
                </div>
                <span className="font-orbitron font-bold text-2xl tracking-wider text-white">
                    NEXUS<span className="text-red-500">.</span>
                </span>
            </a>
            <p className="text-gray-400 font-poppins max-w-sm mb-8 leading-relaxed">
                The premier digital racing league for the next generation of motorsport enthusiasts. Join the revolution.
            </p>
            <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-110 border border-white/5">
                        <Icon className="w-5 h-5" />
                    </a>
                ))}
            </div>
        </div>

        <div>
            <h4 className="font-orbitron font-bold text-white text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 font-poppins text-gray-400">
                {['Home', 'Events', 'Tracks', 'Sponsors', 'Contact'].map((link) => (
                    <li key={link}>
                        <a href={`#${link.toLowerCase()}`} className="hover:text-red-500 transition-colors flex items-center gap-2 group">
                            <span className="w-0 group-hover:w-2 h-[1px] bg-red-500 transition-all duration-300"></span>
                            {link}
                        </a>
                    </li>
                ))}
            </ul>
        </div>

        <div>
            <h4 className="font-orbitron font-bold text-white text-lg mb-6 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4 font-poppins text-gray-400">
                <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                    <span>123 Velocity Lane, Sector 7<br/>Neo Tokyo, NT 2049</span>
                </li>
                <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-red-500 shrink-0" />
                    <a href="mailto:contact@f1nexus.com" className="hover:text-white transition-colors">contact@f1nexus.com</a>
                </li>
                <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-red-500 shrink-0" />
                    <span>+1 (555) 012-3456</span>
                </li>
            </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-gray-600 text-sm font-poppins text-center md:text-left">
            © 2026 F1 Racing League | Designed with Passion for Speed.
        </p>
        <div className="flex gap-6 text-sm text-gray-600 font-poppins">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
