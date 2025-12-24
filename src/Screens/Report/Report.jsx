import React, { useState, useEffect } from 'react';
import { Map, Marker } from 'pigeon-maps';
import { Camera, MapPin, Send, Leaf, X, CheckCircle, ImagePlus, FileText } from 'lucide-react';
import ReportStyles from './styles/styles';
import { submitGarbageReport } from './Service/supabaseReportService';
import { supabase } from '../../lib/supabaseClient';

const GarbageReport = () => {
  const [center, setCenter] = useState([51.505, -0.09]);
  const [marker, setMarker] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  const [photos, setPhotos] = useState([]); // { file, url, id }
  const [isDragging, setIsDragging] = useState(false);

  const [desc, setDesc] = useState('');
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userId, setUserId] = useState(null); // citizenno (UUID)

  // Get authenticated user on mount and listen for changes
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        alert('You must be logged in to submit a report.');
        // Optionally: redirect to login page
      }
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Auto-locate on load
  const findMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCenter([latitude, longitude]);
        setMarker([latitude, longitude]);
        setIsLocating(false);
      },
      (error) => {
        console.error(error);
        alert('Unable to retrieve your location. Please select manually on the map.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    findMe();
  }, []);

  // Photo handling
  const handleFiles = (fileList) => {
    const newPhotos = Array.from(fileList).map(file => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));
    setPhotos(prev => [...prev, ...newPhotos].slice(0, 4)); // Max 4 photos
  };

  const removePhoto = (id) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  // Drag & drop
  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  // Submit handler
  const submit = async (e) => {
    e.preventDefault();

    if (!userId) {
      return alert('You must be logged in to submit a report.');
    }

    if (!marker) {
      return alert('Please set the incident location on the map.');
    }

    if (photos.length === 0) {
      return alert('Please add at least one photo.');
    }

    setIsSubmitting(true);

    try {
      const result = await submitGarbageReport({
        latitude: marker[0],
        longitude: marker[1],
        description: desc,
        photos: photos.map(p => p.file), // Service will use the first photo
        citizenno: userId,
      });

      if (!result.success) {
        throw result.error;
      }

      setDone(true);
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Failed to submit report: ' + (err.message || 'Please try again later.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (done) {
    return (
      <div className="app-viewport">
        <ReportStyles />
        <div className="main-card" style={{ padding: '50px', textAlign: 'center' }}>
          <CheckCircle size={70} color="#10b981" />
          <h2 style={{ marginTop: '20px' }}>Report Submitted Successfully</h2>
          <p style={{ color: '#64748b', marginTop: '10px' }}>
            Thank you! Your report has been received. Our team will review the illegal waste at{' '}
            {marker?.[0]?.toFixed(5)}, {marker?.[1]?.toFixed(5)} using the provided photo.
          </p>
          <button
            className="send-report-btn"
            style={{ width: '100%', marginTop: '30px' }}
            onClick={() => window.location.reload()}
          >
            Submit New Report
          </button>
        </div>
      </div>
    );
  }

  // Main form
  return (
    <div className="app-viewport">
      <ReportStyles />
      <div className="main-card">
        <div className="top-banner">
          <h1><FileText size={28} /> Eco-Report</h1>
          <p>Illegal Waste Reporting</p>
        </div>

        <form className="form-pad" onSubmit={submit}>
          {/* 1. Location */}
          <div>
            <label className="input-heading"><MapPin size={16} /> 1. Incident Location</label>
            <div className="map-container-box">
              <Map height={300} center={center} zoom={16} onClick={({ latLng }) => setMarker(latLng)}>
                {marker && <Marker width={40} anchor={marker} color="#059669" />}
              </Map>
              <button
                type="button"
                className="locate-me-btn"
                onClick={findMe}
                disabled={isLocating}
              >
                {isLocating ? 'Locating...' : 'Refresh GPS'}
              </button>
            </div>
          </div>

          {/* 2. Photos */}
          <div>
            <label className="input-heading"><Camera size={16} /> 2. Photo Evidence (At least 1, max 4)</label>
            <div
              className={`drop-zone ${isDragging ? 'dragging' : ''}`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <ImagePlus size={40} color="#10b981" />
              <div className="camera-action-text">Click to Take Photo or Drag & Drop</div>
              <div className="helper-text">Clear photos help verify the report faster</div>
              <input
                id="fileInput"
                type="file"
                multiple
                hidden
                accept="image/*"
                capture="environment"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {photos.length > 0 && (
              <div className="photo-grid">
                {photos.map(p => (
                  <div key={p.id} className="photo-item">
                    <img src={p.url} alt="Preview" />
                    <button
                      type="button"
                      className="remove-photo-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(p.id);
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Description */}
          <div>
            <label className="input-heading">3. Brief Description <span style={{color: 'red'}}>*</span></label>
            <textarea
              className="description-box"
              rows="4"
              placeholder="Describe the waste: type, amount, any hazards, accessibility..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="send-report-btn" disabled={isSubmitting || !userId}>
            {isSubmitting ? 'Submitting...' : <><Send size={18} /> Submit Report</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GarbageReport;