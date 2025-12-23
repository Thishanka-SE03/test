import React, { useState, useEffect } from 'react';
import { Map, Marker } from 'pigeon-maps';
import { Camera, MapPin, Send, Navigation, Leaf, X, CheckCircle, ImagePlus } from 'lucide-react';
import ReportStyles from './styles/styles';

const GarbageReport = () => {
  const [center, setCenter] = useState([51.505, -0.09]);
  const [marker, setMarker] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  
  // Updated: Photo state is now an array
  const [photos, setPhotos] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const [desc, setDesc] = useState('');
  const [done, setDone] = useState(false);

  // Auto-locate logic
  const findMe = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCenter([latitude, longitude]);
        setMarker([latitude, longitude]);
        setIsLocating(false);
      },
      () => setIsLocating(false),
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => { findMe(); }, []);

  // --- NEW: Multi-Photo Handling ---
  const handleFiles = (fileList) => {
    const newPhotos = Array.from(fileList).map(file => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));
    setPhotos(prev => [...prev, ...newPhotos].slice(0, 4)); // Limit to 4 photos
  };

  const removePhoto = (id) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  // Drag & Drop Handlers
  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!marker || photos.length === 0) return alert("Please provide location and at least one photo.");
    setDone(true);
  };

  if (done) {
    return (
      <div className="app-viewport">
        <ReportStyles />
        <div className="main-card" style={{padding: '50px', textAlign: 'center'}}>
          <CheckCircle size={70} color="#10b981" />
          <h2 style={{marginTop: '20px'}}>Report Submitted</h2>
          <p style={{color: '#64748b'}}>Thank you. Our team will verify the site at {marker[0].toFixed(4)}, {marker[1].toFixed(4)} using your {photos.length} photos.</p>
          <button className="send-report-btn" style={{width: '100%', marginTop: '20px'}} onClick={() => window.location.reload()}>New Report</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-viewport">
      <ReportStyles />
      <div className="main-card">
        <div className="top-banner">
          <h1><Leaf size={28} /> Eco-Report</h1>
          <p>Verified Council Waste Reporting</p>
        </div>

        <form className="form-pad" onSubmit={submit}>
          {/* LOCATION */}
          <div>
            <label className="input-heading"><MapPin size={16}/> 1. Incident Location</label>
            <div className="map-container-box">
              <Map height={300} center={center} zoom={16} onClick={({ latLng }) => setMarker(latLng)}>
                {marker && <Marker width={40} anchor={marker} color="#059669" />}
              </Map>
              <button type="button" className="locate-me-btn" onClick={findMe} disabled={isLocating}>
                {isLocating ? "Wait..." : "Refresh GPS"}
              </button>
            </div>
          </div>

          {/* UPDATED: PHOTO SECTION */}
          <div>
            <label className="input-heading"><Camera size={16}/> 2. Verification Photos (Max 4)</label>
            
            <div 
              className={`drop-zone ${isDragging ? 'dragging' : ''}`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <ImagePlus size={40} color="#10b981" />
              <div className="camera-action-text">Click to Take Photo or Drag & Drop</div>
              <div className="helper-text">Evidence helps the council respond faster</div>
              <input 
                id="fileInput"
                type="file" 
                multiple 
                hidden 
                accept="image/*" 
                capture="environment" // Forces camera on mobile
                onChange={(e) => handleFiles(e.target.files)} 
              />
            </div>

            {/* Photo Preview Gallery */}
            {photos.length > 0 && (
              <div className="photo-grid">
                {photos.map(p => (
                  <div key={p.id} className="photo-item">
                    <img src={p.url} alt="Preview" />
                    <button type="button" className="remove-photo-btn" onClick={(e) => {
                      e.stopPropagation();
                      removePhoto(p.id);
                    }}>
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div>
            <label className="input-heading">3. Brief Description</label>
            <textarea 
              className="description-box"
              rows="3"
              placeholder="E.g. Large sofa, hazardous liquid, blocking the path..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <button type="submit" className="send-report-btn">
            <Send size={18} /> Submit Formal Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default GarbageReport;