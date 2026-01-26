// QRScannerPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

const QRScannerPage = () => {
  const scanLock = useRef(false);
  const [isScanning, setIsScanning] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isScanning) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 280, height: 280 },
      },
      false,
    );

    const onScanSuccess = async (decodedText) => {
      if (scanLock.current) return;
      scanLock.current = true;

      try {
        const clean = decodedText.trim();
        let binId = null;

        // Accept: "BIN:4", "SMARTBIN:4", "4"
        if (clean.includes(":")) {
          binId = clean.split(":")[1];
        } else if (/^\d+$/.test(clean)) {
          binId = clean;
        }

        if (!binId) throw new Error("INVALID_QR");

        // 🔴 1. CHECK BIN STATUS (FULL / AVAILABLE)
        const { data: bin, error: binErr } = await supabase
          .from("smartbin")
          .select("status")
          .eq("binid", binId)
          .single();

        if (binErr || !bin) {
          throw new Error("BIN_NOT_FOUND");
        }

        if (bin.status === "full") {
          alert(
            "❌ Sorry, this Smart Bin is currently FULL. Please use another bin.",
          );
          scanLock.current = false;
          return;
        }

        // 🔍 2. CHECK IF BIN ALREADY HAS ACTIVE SESSION
        const { data: existing } = await supabase
          .from("bin_sessions")
          .select("session_id")
          .eq("bin_id", binId)
          .eq("status", "active")
          .maybeSingle();

        if (existing) {
          alert("🚫 This Smart Bin is currently in use");
          scanLock.current = false;
          return;
        }

        // 🚀 3. START SESSION
        const { error } = await supabase.from("bin_sessions").insert({
          bin_id: binId,
          citizen_id: user.id,
          status: "active",
        });

        if (error) throw error;

        // Optional local marker
        localStorage.setItem(
          "activeBinSession",
          JSON.stringify({
            binId,
            citizenId: user.id,
            startedAt: Date.now(),
          }),
        );

        await scanner.clear();
        setIsScanning(false);
        setShouldRedirect(true);

        window.location.replace("/dashboard");
      } catch (err) {
        console.error(err);
        scanLock.current = false;
        alert("❌ Invalid or unavailable Smart Bin QR");
      }
    };

    scanner.render(onScanSuccess, () => {});

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [isScanning, user, navigate]);
  useEffect(() => {
    if (shouldRedirect) {
      navigate("/dashboard", { replace: true });
    }
  }, [shouldRedirect, navigate]);

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
