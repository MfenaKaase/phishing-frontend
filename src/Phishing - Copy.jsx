import React, { useState } from 'react';

function PhishingAnalyzer() {
    const [message, setMessage] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading status

    // A simple phishing test based on common phishing words
    
    const handleInputChange = (e) => {
        setMessage(e.target.value);
      };

    
      const handleAnalyze = async () => {
        setLoading(true);
        setResult('');
      
        try {
          const response = await fetch('http://localhost:5000/analyze', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            setResult(data.result);
          } else {
            setResult('❌ Error analyzing message.');
          }
        } catch (error) {
          console.error('Error:', error);
          setResult('❌ Server error.');
        }
      
        setLoading(false);
      };
      
          
        
          return (
            <div className="container">
              <h1 className="title">Phishing Message Analyzer</h1>
              <div className="glass-container">
                <textarea
                  value={message}
                  onChange={handleInputChange}
                  rows="10"
                  cols="30"
                  placeholder="Paste the message here"
                  className="input-text"
                />
                <button onClick={handleAnalyze} className="analyze-button">
                  {loading ? 'Analyzing...' : 'Analyze'} {/* Change button text */}
                </button>
                {loading && <div className="loading-spinner"></div>} {/* Loading spinner */}
                <p className="result">
                  {result}
                </p>
              </div>
            </div>
    );
}

export default PhishingAnalyzer;