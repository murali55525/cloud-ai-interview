import React, { useState, useEffect } from 'react';

function FrontPage({ onSelect }) {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [particles, setParticles] = useState([]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y > 100 ? -5 : particle.y + particle.speed * 0.1,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.1,
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-center-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-pink-900/20"></div>
      
      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
        />
      ))}

      {/* Geometric Shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-cyan-500/20 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border border-pink-500/20 rounded-lg rotate-45 animate-pulse"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 border border-purple-500/20 rounded-full animate-bounce"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-lg px-4 sm:px-6 lg:px-8 animate-slide-in">
        <div className="fixed-center-card glass">
          {/* Card Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
          
          <div className="relative z-10">
            {/* Header Section */}
            <div className="text-center mb-8">
              {/* Logo with Enhanced Animation */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse"></div>
                  <div className="absolute inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-spin-slow opacity-50"></div>
                  <svg className="w-12 h-12 text-white z-10 relative" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                {/* Orbiting Elements */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute -top-2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2"></div>
                  <div className="absolute top-1/2 -right-2 w-2 h-2 bg-purple-400 rounded-full transform -translate-y-1/2"></div>
                  <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-pink-400 rounded-full transform -translate-x-1/2"></div>
                  <div className="absolute top-1/2 -left-2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-y-1/2"></div>
                </div>
              </div>

              {/* Title with Typewriter Effect */}
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 tracking-wide">
                AI Interview Portal
              </h1>
              
              {/* Subtitle with Fade Animation */}
              <p className="text-lg text-white/80 mb-2 font-medium">
                Welcome to the Future
              </p>
              <p className="text-sm text-white/60">
                Choose your role to continue your journey
              </p>
            </div>

            {/* Buttons Section */}
            <div className="space-y-4">
              {/* Admin Button */}
              <button
                className={`group relative w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden ${
                  hoveredButton === 'admin' 
                    ? 'transform scale-105 shadow-2xl' 
                    : 'shadow-xl hover:shadow-2xl'
                }`}
                onClick={() => onSelect('admin')}
                onMouseEnter={() => setHoveredButton('admin')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 transition-all duration-300 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-indigo-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Admin Dashboard</span>
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
                </div>
              </button>

              {/* Client Button */}
              <button
                className={`group relative w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden ${
                  hoveredButton === 'client' 
                    ? 'transform scale-105 shadow-2xl' 
                    : 'shadow-xl hover:shadow-2xl'
                }`}
                onClick={() => onSelect('client')}
                onMouseEnter={() => setHoveredButton('client')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 transition-all duration-300 group-hover:from-emerald-600 group-hover:via-teal-600 group-hover:to-cyan-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Client Portal</span>
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
                </div>
              </button>
            </div>

            {/* Footer Info */}
            <div className="mt-8 text-center">
              <p className="text-xs text-white/40">
                Powered by AI • Secure • Modern
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default FrontPage;