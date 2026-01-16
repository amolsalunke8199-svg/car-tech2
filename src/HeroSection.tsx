import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToCollection = () => {
    const element = document.getElementById('car-collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Diagonal lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent transform -rotate-12" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent transform rotate-12" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-sm text-gold font-medium">Premium Car Collection</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white">Premium Cars,</span>
          <br />
          <span className="bg-gradient-to-r from-gold via-amber-400 to-gold bg-clip-text text-transparent">
            Premium Experience
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover our exclusive collection of luxury and performance vehicles. 
          Your dream car is just a click away.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={scrollToCollection}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold to-amber-500 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 hover:scale-105 text-lg"
          >
            Explore Collection
          </button>
          <a
            href={`https://wa.me/919527006593?text=${encodeURIComponent('Hi, I am interested in cars listed on Car Tec.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-zinc-700 text-white font-bold rounded-xl hover:border-gold hover:text-gold transition-all duration-300 text-lg"
          >
            Contact Us
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-gold">50+</p>
            <p className="text-xs sm:text-sm text-zinc-500">Premium Cars</p>
          </div>
          <div className="text-center border-x border-zinc-800">
            <p className="text-2xl sm:text-3xl font-bold text-gold">100%</p>
            <p className="text-xs sm:text-sm text-zinc-500">Verified</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-gold">24/7</p>
            <p className="text-xs sm:text-sm text-zinc-500">Support</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <button 
          onClick={scrollToCollection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-gold/50 hover:text-gold transition-colors" />
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default HeroSection;
