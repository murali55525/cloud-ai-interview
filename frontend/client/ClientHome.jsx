import React, { useState, useEffect } from 'react'

function ClientHome({ onBack, task }) {
  // stages: 'details' → 'interview'
  const [stage, setStage] = useState('details')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeAnalysis, setResumeAnalysis] = useState('')
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const mockTask = "Describe your experience with AI interviews and how you handle technical challenges."

  // Progress calculation
  useEffect(() => {
    const fields = [name, email, phone, resumeFile]
    const completed = fields.filter(field => field).length
    setProgress((completed / fields.length) * 100)
  }, [name, email, phone, resumeFile])

  // Analyze resume for suggested role
  const handleUpload = e => {
    const file = e.target.files?.[0] || e.dataTransfer?.files?.[0]
    if (!file) return
    
    setIsLoading(true)
    setResumeFile(file)
    
    const reader = new FileReader()
    reader.onload = evt => {
      setTimeout(() => {
        const txt = evt.target.result.toLowerCase()
        let role = 'General Position'
        let skills = []
        
        if (txt.includes('react') || txt.includes('angular') || txt.includes('vue')) {
          role = 'Frontend Developer'
          skills = ['React', 'JavaScript', 'CSS']
        } else if (txt.includes('node') || txt.includes('java') || txt.includes('python')) {
          role = 'Backend Engineer'
          skills = ['API Development', 'Database', 'Server Management']
        } else if (txt.includes('data') || txt.includes('machine learning') || txt.includes('ai')) {
          role = 'Data Scientist'
          skills = ['Python', 'Machine Learning', 'Analytics']
        } else if (txt.includes('design') || txt.includes('ui') || txt.includes('ux')) {
          role = 'UI/UX Designer'
          skills = ['Design Systems', 'User Experience', 'Prototyping']
        }
        
        setResumeAnalysis({ role, skills })
        setIsLoading(false)
      }, 1500)
    }
    reader.readAsText(file)
  }

  const handleDrag = e => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleUpload(e)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setStage('interview')
      setIsLoading(false)
    }, 2000)
  }

  const handleInterviewSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    setTimeout(() => {
      setSubmitted(true)
      setIsLoading(false)
      setTimeout(() => setSubmitted(false), 5000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Wrap content in responsive container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto animate-slide-in">
          
          {/* Enhanced Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="relative inline-block mb-6 sm:mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-md opacity-60 animate-pulse"></div>
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl mx-auto">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2 sm:mb-4 tracking-tight">
              Client Portal
            </h1>
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-medium px-4">
              {stage === 'details' ? 'Complete your profile to begin your journey' : 'Showcase your expertise in this assessment'}
            </p>
            
            {/* Progress indicator for details stage */}
            {stage === 'details' && (
              <div className="mt-6 sm:mt-8 max-w-xs sm:max-w-md mx-auto px-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm text-slate-400">Profile Completion</span>
                  <span className="text-xs sm:text-sm text-purple-400 font-medium">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 sm:h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Main Card */}
          <div className="relative mx-auto w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-2xl sm:rounded-3xl blur-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/20">
              
              {stage === 'details' && (
                <form className="space-y-6 sm:space-y-8 lg:space-y-10" onSubmit={handleSubmit}>
                  <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 sm:mb-4">
                      Your Professional Profile
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base lg:text-lg px-4">Let us know about you and upload your resume for personalized matching</p>
                  </div>

                  {/* Enhanced Personal Details */}
                  <div className="grid grid-cols-1 gap-6 sm:gap-8">
                    <div className="space-y-3">
                      <label className="block text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          value={name}
                          onChange={e=>setName(e.target.value)}
                          required
                          placeholder="Enter your full name"
                          className="w-full bg-white/5 border-2 border-white/20 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 lg:py-5 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 text-base sm:text-lg font-medium"
                        />
                        <div className="absolute right-3 sm:right-5 top-1/2 transform -translate-y-1/2">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      <div className="space-y-3">
                        <label className="block text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            required
                            type="email"
                            placeholder="your.email@example.com"
                            className="w-full bg-white/5 border-2 border-white/20 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 lg:py-5 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 text-base sm:text-lg font-medium"
                          />
                          <div className="absolute right-3 sm:right-5 top-1/2 transform -translate-y-1/2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          Phone Number
                        </label>
                        <div className="relative">
                          <input
                            value={phone}
                            onChange={e=>setPhone(e.target.value)}
                            required
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className="w-full bg-white/5 border-2 border-white/20 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 lg:py-5 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 text-base sm:text-lg font-medium"
                          />
                          <div className="absolute right-3 sm:right-5 top-1/2 transform -translate-y-1/2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Resume Upload */}
                  <div className="space-y-4 sm:space-y-6">
                    <label className="block text-base sm:text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      Upload Your Resume
                    </label>
                    
                    <div 
                      className={`relative border-2 border-dashed rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-center transition-all duration-300 ${
                        dragActive 
                          ? 'border-purple-400 bg-purple-400/10 scale-105' 
                          : 'border-white/30 hover:border-purple-400/50 hover:bg-white/5'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept=".txt,.md,.pdf,.doc,.docx"
                        onChange={handleUpload}
                        required
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      
                      {isLoading ? (
                        <div className="space-y-4">
                          <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto animate-spin">
                            <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </div>
                          <p className="text-white text-base sm:text-lg font-medium">Analyzing your resume...</p>
                        </div>
                      ) : (
                        <div className="space-y-4 sm:space-y-6">
                          <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-white text-lg sm:text-xl font-semibold mb-2">
                              {dragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
                            </p>
                            <p className="text-white/60 text-sm sm:text-base mb-4">
                              or click to browse files
                            </p>
                            <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-white/40">
                              <span className="px-2 sm:px-3 py-1 bg-white/10 rounded-full">PDF</span>
                              <span className="px-2 sm:px-3 py-1 bg-white/10 rounded-full">DOC</span>
                              <span className="px-2 sm:px-3 py-1 bg-white/10 rounded-full">TXT</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {resumeFile && (
                      <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-2 border-emerald-400/40 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-emerald-400/20 rounded-xl flex items-center justify-center">
                            <svg className="w-7 h-7 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-emerald-300 font-semibold text-lg">{resumeFile.name}</p>
                            <p className="text-emerald-200 text-sm">{(resumeFile.size / 1024).toFixed(1)} KB • Uploaded successfully</p>
                          </div>
                          <div className="text-emerald-400">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}

                    {resumeAnalysis && (
                      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-400/40 rounded-2xl p-8 backdrop-blur-sm">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-blue-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-blue-300 font-bold text-xl mb-3">AI Resume Analysis</h4>
                            <div className="space-y-3">
                              <div>
                                <span className="text-blue-200 font-medium">Suggested Role: </span>
                                <span className="text-white font-semibold">{resumeAnalysis.role}</span>
                              </div>
                              <div>
                                <span className="text-blue-200 font-medium">Key Skills Detected: </span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {resumeAnalysis.skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-400/20 text-blue-200 rounded-full text-sm font-medium">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Submit Button */}
                  <div className="pt-6 sm:pt-8">
                    <button
                      type="submit"
                      disabled={!name || !email || !phone || !resumeFile || isLoading}
                      className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 disabled:from-gray-500 disabled:to-gray-600 disabled:opacity-50 text-white py-3 sm:py-4 lg:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 disabled:transform-none transition-all duration-300 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700"></div>
                      <div className="relative flex items-center justify-center space-x-3">
                        {isLoading ? (
                          <>
                            <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span>Proceed to Interview</span>
                          </>
                        )}
                      </div>
                    </button>

                    <button 
                      type="button" 
                      onClick={onBack} 
                      className="w-full mt-4 sm:mt-6 text-slate-300 hover:text-white underline text-center py-2 sm:py-3 text-base sm:text-lg font-medium transition-colors duration-300"
                    >
                      ← Cancel
                    </button>
                  </div>
                </form>
              )}

              {stage === 'interview' && (
                <form className="space-y-6 sm:space-y-8 lg:space-y-10" onSubmit={handleInterviewSubmit}>
                  <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl mb-6">
                      <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                      Interview Assessment
                    </h3>
                    <p className="text-slate-300 text-lg">Take your time to provide a thoughtful and comprehensive response</p>
                  </div>

                  {/* Enhanced Task Display */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl"></div>
                    <div className="relative bg-white/5 border-2 border-white/20 rounded-2xl p-8 backdrop-blur-sm">
                      <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-xl flex items-center justify-center">
                          <svg className="w-7 h-7 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                            Interview Question
                          </h4>
                          <p className="text-white/90 leading-relaxed text-lg font-medium">{task || mockTask}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Answer Field */}
                  <div className="space-y-3 sm:space-y-4">
                    <label className="block text-base sm:text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      Your Response
                    </label>
                    <div className="relative">
                      <textarea
                        value={answer}
                        onChange={e=>setAnswer(e.target.value)}
                        required
                        placeholder="Share your thoughts, experiences, and insights here. Be specific and provide examples where possible..."
                        className="w-full bg-white/5 border-2 border-white/20 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-4 sm:py-6 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 resize-none text-base sm:text-lg leading-relaxed font-medium"
                        rows={6}
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                      <span className="bg-white/10 px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm text-white/70">
                        {answer.length < 50 ? 'Minimum 50 characters recommended' : 'Great length!'}
                      </span>
                      <span className="bg-white/10 px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm text-white/70 font-medium">
                        {answer.length} characters
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Submit Button */}
                  <div className="pt-8">
                    <button
                      type="submit"
                      disabled={answer.length < 10 || isLoading}
                      className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 disabled:opacity-50 text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 disabled:transform-none transition-all duration-300 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700"></div>
                      <div className="relative flex items-center justify-center space-x-3">
                        {isLoading ? (
                          <>
                            <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Submitting Response...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                            <span>Submit Response</span>
                          </>
                        )}
                      </div>
                    </button>

                    {/* Success Message */}
                    {submitted && (
                      <div className="mt-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/40 rounded-2xl p-8 backdrop-blur-sm animate-slide-in">
                        <div className="text-center">
                          <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-40 animate-pulse"></div>
                            <div className="relative w-20 h-20 bg-green-400/20 rounded-full flex items-center justify-center">
                              <svg className="w-10 h-10 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <h4 className="text-green-300 font-bold text-2xl mb-3">Response Submitted Successfully!</h4>
                          <p className="text-green-200 text-lg leading-relaxed">
                            Thank you for completing the interview assessment. Our team will review your response and contact you with the results within 2-3 business days.
                          </p>
                          <div className="mt-6 p-4 bg-green-400/10 rounded-xl">
                            <p className="text-green-300 text-sm font-medium">
                              📧 Confirmation email sent to {email}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <button 
                      type="button" 
                      onClick={onBack} 
                      className="w-full mt-6 text-slate-300 hover:text-white underline text-center py-3 text-lg font-medium transition-colors duration-300"
                    >
                      ← Back to Home
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientHome