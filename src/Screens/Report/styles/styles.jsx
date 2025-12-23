import React from 'react';

const ReportStyles = () => (
  <style>{`
    .app-viewport {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      padding: 30px 15px;
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #064e3b;
      overflow: scroll;
      overflow-x: hidden;
    }

    .main-card {
      max-width: 650px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 28px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.2);
      overflow: hidden;
    }

    .top-banner {
      background: #059669;
      padding: 30px 20px;
      color: #ffffff;
      text-align: center;
    }

    .top-banner h1 { margin: 0; font-size: 26px; display: flex; align-items: center; justify-content: center; gap: 12px; }

    .form-pad { padding: 30px; display: flex; flex-direction: column; gap: 28px; }

    .input-heading {
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      color: #059669;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* --- ENHANCED PHOTO SECTION STYLES --- */
    
    .drop-zone {
      border: 2px dashed #10b981;
      background: #f9fafb;
      border-radius: 20px;
      padding: 30px 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .drop-zone.dragging {
      background: #d1fae5;
      border-color: #047857;
      transform: scale(1.02);
    }

    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 12px;
      margin-top: 15px;
    }

    .photo-item {
      position: relative;
      aspect-ratio: 1/1;
      border-radius: 12px;
      overflow: hidden;
      border: 2px solid #ecfdf5;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .photo-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .remove-photo-btn {
      position: absolute;
      top: 4px;
      right: 4px;
      background: rgba(239, 68, 68, 0.9);
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-weight: bold;
    }

    .camera-action-text {
      font-size: 14px;
      font-weight: 600;
      color: #059669;
    }

    .helper-text {
      font-size: 12px;
      color: #6b7280;
    }

    /* --- EXISTING STYLES --- */

    .map-container-box {
      height: 300px;
      border-radius: 20px;
      overflow: hidden;
      border: 3px solid #f0fdf4;
      position: relative;
    }

    .locate-me-btn {
      position: absolute;
      bottom: 15px;
      right: 15px;
      z-index: 5;
      background: #ffffff;
      border: none;
      padding: 10px 16px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 12px;
      color: #059669;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .description-box {
      width: 100%;
      padding: 16px;
      border-radius: 15px;
      border: 2px solid #f3f4f6;
      background: #f9fafb;
      font-size: 15px;
      box-sizing: border-box;
      font-family: inherit;
    }

    .send-report-btn {
      background: #059669;
      color: #ffffff;
      border: none;
      padding: 18px;
      border-radius: 18px;
      font-size: 17px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      box-shadow: 0 10px 15px -3px rgba(5, 150, 105, 0.3);
    }
  `}</style>
);

export default ReportStyles;