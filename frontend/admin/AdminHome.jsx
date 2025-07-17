import React, { useState, useEffect } from 'react';

function AdminHome({ onBack, clientName, setClientName, task, setTask, assigned, setAssigned }) {
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.2,
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y > 100 ? -5 : particle.y + particle.speed * 0.08,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.05,
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setAssigned(true);
    setIsSubmitting(false);
    
    setTimeout(() => setAssigned(false), 4000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-indigo-900/20"></div>
      
      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-300 rounded-full animate-pulse"
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
      <div className="absolute top-20 left-20 w-24 h-24 border border-blue-500/20 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-32 right-16 w-20 h-20 border border-indigo-500/20 rounded-lg rotate-45 animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-16 h-16 border border-purple-500/20 rounded-full animate-bounce"></div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="relative w-full max-w-lg">
          {/* Enhanced Glass Card */}
          <div className={`relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl transition-all duration-500 ${
            isFormFocused ? 'scale-105 shadow-blue-500/20' : ''
          }`}>
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            
            <div className="relative z-10">
              {/* Header Section */}
              <div className="text-center mb-8">
                {/* Enhanced Logo */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl relative group">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 animate-pulse opacity-50"></div>
                    <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 animate-spin-slow opacity-30"></div>
                    <svg className="w-10 h-10 text-white z-10 relative transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {/* Status Indicators */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  Admin Dashboard
                </h2>
                <p className="text-blue-200/80 text-lg">Assign interview tasks to clients</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/60">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>System Online</span>
                </div>
              </div>

              {/* Enhanced Form */}
              <div
                className="space-y-6"
                onFocus={() => setIsFormFocused(true)}
                onBlur={() => setIsFormFocused(false)}
              >
                {/* Client Name Field */}
                <div className="group">
                  <label className="flex items-center gap-2 text-white/90 font-semibold mb-3">
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Client Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter client's full name"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      required
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Task Field */}
                <div className="group">
                  <label className="flex items-center gap-2 text-white/90 font-semibold mb-3">
                    <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    Interview Task
                  </label>
                  <div className="relative">
                    <textarea
                      placeholder="Describe the interview task or questions..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none group-hover:bg-white/15"
                      value={task}
                      onChange={e => setTask(e.target.value)}
                      rows={4}
                      required
                    />
                    <div className="absolute left-3 top-3">
                      <svg className="w-5 h-5 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Enhanced Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!clientName || !task || isSubmitting}
                  className="group relative w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 overflow-hidden disabled:cursor-not-allowed"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r transition-all duration-300 ${
                    !clientName || !task 
                      ? 'from-gray-500 to-gray-600 opacity-50' 
                      : 'from-blue-600 via-indigo-600 to-purple-600 group-hover:from-blue-700 group-hover:via-indigo-700 group-hover:to-purple-700'
                  }`}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-white">Assigning...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-white">Assign Task</span>
                      </>
                    )}
                  </div>
                </button>

                {/* Success Message */}
                {assigned && (
                  <div className="relative bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 border border-green-400/30 rounded-xl p-4 text-center animate-slide-in">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-xl blur-sm"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-green-200 font-semibold">Task Successfully Assigned!</p>
                        <p className="text-green-300/80 text-sm">Client: {clientName}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Back Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={onBack}
                  className="group inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors duration-300"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="underline">Back to Home</span>
                </button>
              </div>
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
          animation: spin-slow 10s linear infinite;
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default AdminHome;