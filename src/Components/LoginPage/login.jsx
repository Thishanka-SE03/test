import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style/LoginPage.module.css";
import logo from "../../assets/images/logo.png";
import { image } from "framer-motion/client";

// images for background shuffle
import bg1 from "../Images/Caro1.jpg";
import bg2 from "../Images/Caro2.jpg";
import bg3 from "../Images/Caro3.jpg";
import bg4 from "../Images/Caro4.jpg";
import bg5 from "../Images/Caro5.jpg";

const backgroundImages = [bg1, bg2, bg3, bg4, bg5];

const LoginPage = () => {
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Preload images (no flicker)
  useEffect(() => {
    backgroundImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Shuffle background
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual authentication
      console.log("Login attempt with:", formData);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any valid email format
      // In real app, you would check credentials against your backend
      // Example: const response = await loginAPI(formData.email, formData.password);
      
      // If successful, navigate to dashboard
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Login failed:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Invalid credentials. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demo login handler (optional - for testing)
  const handleDemoLogin = () => {
    setFormData({
      email: "demo@example.com",
      password: "demo123",
    });
    // Clear errors when using demo
    setErrors({
      email: "",
      password: "",
      general: "",
    });
  };

  return (
    <main className={styles.landingPage}>
      {/* 🔄 Image Shuffle Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className={styles.bgImage}
          style={{
            backgroundImage: `url(${backgroundImages[index]})`,
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Emerald overlay */}
      <div className={styles.overlay} />

      {/* Content */}
      <section className={styles.content}>
        <header className={styles.header}>
          <img src={logo} alt="EcoSphere Logo" className={styles.logo} />
        </header>
        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <h2 className={styles.heroTitle}>Welcome Back!</h2>
          <p className={styles.heroSubtitle}>
            Enter your credentials to access your account
          </p>
        </div>

        {/* Display general error */}
        {errors.general && (
          <div className={styles.errorMessage}>
            {errors.general}
          </div>
        )}

       {/* Login Form Section */}
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            />
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          <div className={styles.formLinks}>
            <a href="#" className={styles.forgotPassword}>
              Forgot Password?
            </a>
            <button 
              type="button" 
              onClick={handleDemoLogin}
              className={styles.demoLink}
            >
              Use Demo Account
            </button>
          </div>
          
          <button 
            type="submit" 
            className={`${styles.btnSecondary} ${isSubmitting ? styles.btnDisabled : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;