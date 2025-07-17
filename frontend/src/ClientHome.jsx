import React, { useState } from 'react'

function ClientHome({ onBack, task }) {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const mockTask = "Describe your experience with AI interviews and how you handle technical challenges.";

  const handleUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    setResumeFile(file);
    const reader = new FileReader();
    reader.onload = evt => {
      const txt = evt.target.result.toLowerCase();
      let role = 'General Position';
      if (txt.includes('react') || txt.includes('angular')) role = 'Frontend Developer';
      else if (txt.includes('node') || txt.includes('java')) role = 'Backend Engineer';
      else if (txt.includes('data') || txt.includes('python')) role = 'Data Scientist';
      setAnalysis(`Suggested Role: ${role}`);
    }
    reader.readAsText(file);
  }

  return (
    <div className="flex-center-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden">
      {/* ...background... */}
      <div className="relative z-10 w-full max-w-md px-4 sm:px-6 lg:px-8 animate-slide-in">
        <div className="fixed-center-card glass">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-xl">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Client Portal
            </h2>
            <p className="text-emerald-200">
              {!authenticated ? 'Secure access to your interview' : 'Complete your interview assessment'}
            </p>
          </div>
          {!authenticated ? (
            <form
              className="flex flex-col gap-6 w-full max-w-md mx-auto"
              onSubmit={e => {
                e.preventDefault();
                if (password === 'client123') setAuthenticated(true);
              }}
            >
              <label className="text-white/90 font-semibold w-full">
                Password
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full mt-2 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </label>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Login
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Client details */}
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Your Details</h3>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full my-1 p-2 rounded bg-white/10 border border-white/20 text-white"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full my-1 p-2 rounded bg-white/10 border border-white/20 text-white"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full my-1 p-2 rounded bg-white/10 border border-white/20 text-white"
                />
              </div>

              {/* Resume upload */}
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Upload Resume</h3>
                <input
                  type="file"
                  accept=".txt,.md"
                  onChange={handleUpload}
                  className="w-full text-sm text-white file:bg-cyan-600 file:px-3 file:py-1 file:rounded file:text-white"
                />
                {resumeFile && (
                  <p className="mt-2 text-white/80 text-sm">{resumeFile.name}</p>
                )}
              </div>

              {/* Analysis result */}
              {analysis && (
                <div className="bg-white/10 border border-white/20 rounded p-4 text-white">
                  {analysis}
                </div>
              )}

              <button
                onClick={onBack}
                className="mt-4 text-white underline"
              >
                ← Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientHome
