// QRScannerPage.jsx
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const QRScannerPage = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const BRIDGE_URL = import.meta.env.NGROK_BRIDGE_URL;

  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isScanning) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 280, height: 280 },
        aspectRatio: 1,
        supportedScanTypes: [0],
      },
      false
    );

    const onScanSuccess = async (decodedText) => {
      try {
        const clean = decodedText.trim();

        let binId = null;

        // Accept formats: "BIN:3", "SMARTBIN:3", "3"
        if (clean.includes(":")) {
          const parts = clean.split(":");
          binId = parts[1];
        } else if (/^\d+$/.test(clean)) {
          binId = clean;
        }

        if (!binId) {
          alert("Invalid Smart Bin QR");
          return;
        }

        // Save session locally
        localStorage.setItem(
          "activeBinSession",
          JSON.stringify({
            binId,
            citizenId: user.id,
            startedAt: Date.now(),
          })
        );

        // Notify Node bridge
        await fetch(`${BRIDGE_URL}/start-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            citizenId: user.id,
            binId,
          }),
        });

        scanner.clear();
        setIsScanning(false); // unmount scanner
        setShouldRedirect(true);
      } catch (err) {
        console.error(err);
        alert("Invalid Smart Bin QR");
      }
    };

    const onScanFailure = () => {
      // Silently handle scan failures (common during scanning)
    };

    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [isScanning]);
  useEffect(() => {
    if (shouldRedirect) {
      window.location.href = "/dashboard";
    }
  }, [shouldRedirect, navigate]);

  const handleRestart = () => {
    setScanResult(null);
    setIsScanning(true);
  };

  return (
    <div className="page">
      <div className="scanner-container">
        <h2 className="title">QR Code Scanner</h2>
        <p className="instruction">Point your camera at a QR code</p>

        {isScanning && <div id="qr-reader" className="qr-reader" />}

        <style jsx>{`
          .page {
            height: 100vh;
            overflow: scroll;
            overflow-x: hidden;
          }

          .scanner-container {
            padding: 24px;
            font-family: "Segoe UI", Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
            background-color: #f8fff8;
            min-height: 100vh;
          }

          .title {
            color: #2e7d32;
            font-size: 28px;
            margin-bottom: 8px;
            font-weight: 600;
          }

          .instruction {
            color: #4caf50;
            font-size: 16px;
            margin-bottom: 24px;
          }

          .qr-reader {
            width: 100%;
            border: 4px solid #4caf50;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(76, 175, 80, 0.2);
          }

          .result-card {
            background: white;
            border-radius: 16px;
            padding: 32px 24px;
            margin-top: 32px;
            box-shadow: 0 10px 30px rgba(76, 175, 80, 0.15);
            border: 2px solid #e8f5e9;
          }

          .success-title {
            color: #2e7d32;
            font-size: 24px;
            margin-bottom: 20px;
          }

          .result {
            background-color: #e8f5e9;
            padding: 16px;
            border-radius: 12px;
            margin: 20px 0;
            word-break: break-all;
            font-size: 16px;
            color: #1b5e20;
          }

          .result-link {
            color: #4caf50;
            text-decoration: underline;
            font-weight: 500;
          }

          .scan-again-btn {
            background-color: #4caf50;
            color: white;
            border: none;
            padding: 14px 32px;
            font-size: 18px;
            font-weight: 600;
            border-radius: 12px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
            transition: all 0.3s ease;
            margin-top: 16px;
          }

          .scan-again-btn:hover {
            background-color: #388e3c;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
          }

          .scan-again-btn:active {
            transform: translateY(0);
          }
        `}</style>
      </div>
    </div>
  );
};

export default QRScannerPage;
