import React from "react";

const WelcomePage = () => {
  return (
    <div>
      {/* Internal CSS using style tag */}
      <style>
        {`
          body {
            background: linear-gradient(135deg, #ff9a9e, #fad0c4, #ffdde1, #a18cd1, #fbc2eb);
            
          }

          .welcome-container {
            padding: 20px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .main-title {
            font-size: 2rem;
            font-weight: bold;
          }

          .subtitle {
            font-size: 1.2rem;
          }

          .side-text {
            margin-top: 15px;
            font-size: 1rem;
          }
        `}
      </style>

      <div className="welcome-container">
        <main className="welcome-content">
          <h2 className="main-title">DON'T WASTE YOUR MONEY</h2>
          <p className="subtitle">Simple way to manage personal finances</p>
          <div className="side-text">Your finances on any device</div>
        </main>
      </div>
    </div>
  );
};

export default WelcomePage;
