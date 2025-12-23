import React from 'react';

const Styles = () => (
  <style>{`
    * { box-sizing: border-box; }

    html, body {
      margin: 0;
      padding: 0;
      background: #010a08;
      color: #f0fdf4;
      font-family: 'Inter', -apple-system, sans-serif;
      /* Prevent horizontal shake, allow vertical scroll */
      overflow-x: hidden; 
      min-height: 100vh;
    }

    .page-container {
      position: relative;
      overflow: scroll;
      overflow-x: hidden;
    }

    /* Molten Emerald Background */
    .molten-bg {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      z-index: -1;
      background: linear-gradient(135deg, #010a08 0%, #064e3b 100%);
    }
    
    .molten-orb {
      position: absolute;
      width: 60vw; height: 60vw;
      background: radial-gradient(circle, #059669 0%, transparent 70%);
      filter: blur(100px);
      opacity: 0.15;
      animation: float 20s infinite alternate;
    }

    @keyframes float {
      from { transform: translate(-10%, -10%); }
      to { transform: translate(20%, 20%); }
    }

    .app-wrapper {
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .nav-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 800;
      color: #34d399;
      display: flex;
      align-items: center;
      gap: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    /* THE GRID FIX: No fixed height. Auto-layout. */
    .dashboard-grid {
      display: grid;
      grid-template-columns: 350px 1fr 350px;
      gap: 20px;
      align-items: start;
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 32px;
      padding: 25px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
    }

    /* Tree Stage Container */
    .canvas-section {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .canvas-holder {
      width: 100%;
      aspect-ratio: 4 / 3; /* Responsive aspect ratio */
      min-height: 400px;
      border-radius: 40px;
      cursor: grab;
      position: relative;
    }

    .points-pill {
      background: rgba(0,0,0,0.4);
      border: 1px solid #059669;
      padding: 15px 30px;
      border-radius: 30px;
      text-align: center;
      margin: 0 auto;
      width: 380px;
    }

    .progress-track {
      width: 350px;
      height: 6px;
      background: rgba(255,255,255,0.1);
      border-radius: 10px;
      margin-top: 10px;
      overflow: hidden;
      margin-left: -12px;
    }

    .progress-fill {
      height: 100%;
      background: #34d399;
      box-shadow: 0 0 15px #34d399;
    }

    .item-btn {
      width: 100%;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 18px;
      border-radius: 20px;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      margin-bottom: 12px;
      transition: 0.3s;
    }

    .item-btn:hover {
      background: rgba(16, 185, 129, 0.1);
      border-color: #34d399;
      transform: translateY(-2px);
    }

    /* Mobile Responsive Logic */
    @media (max-width: 1200px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
      }
      .canvas-section {
        order: -1; /* Tree on top */
      }
    }

    @media (max-width: 600px) {
      .app-wrapper { padding: 10px; }
      .canvas-holder { aspect-ratio: 1; min-height: 300px; }
    }
  `}</style>
);

export default Styles;