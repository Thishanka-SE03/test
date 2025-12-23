import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style/LoginPage.module.css";
import logo from "../../assets/images/logo.png";
import { image } from "framer-motion/client";
import { citizenLogin } from "../../services/authService";
import { sendPasswordReset } from "../../services/authService";

// images for background shuffle
import bg1 from "../Images/Caro1.jpg";
import bg2 from "../Images/Caro2.jpg";
import bg3 from "../Images/Caro3.jpg";
import bg4 from "../Images/Caro4.jpg";
import bg5 from "../Images/Caro5.jpg";

const backgroundImages = [bg1, bg2, bg3, bg4, bg5];

const LoginPage = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);
  // ✅ ADD THIS
  const [isLoading, setIsLoading] = useState(false);

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

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const userProfile = await citizenLogin(formData.email, formData.password);

      console.log("Logged in citizen:", userProfile);

      // Optional: store user locally (temporary)
      localStorage.setItem("user", JSON.stringify(userProfile));

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Invalid credentials",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter your email to reset password",
      }));
      return;
    }

    try {
      setIsLoading(true); // 🔥 start animation
      await sendPasswordReset(formData.email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false); // 🔥 stop animation
    }
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
          <div className={styles.errorMessage}>{errors.general}</div>
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
              className={`${styles.input} ${
                errors.email ? styles.inputError : ""
              }`}
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
              className={`${styles.input} ${
                errors.password ? styles.inputError : ""
              }`}
            />
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          <button
            type="button"
            className={styles.forgotPassword}
            onClick={handleForgotPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loadingWrapper}>
                <span className={styles.spinner}></span>
                Sending reset email...
              </span>
            ) : (
              "Forgot Password?"
            )}
          </button>

          <button
            type="submit"
            className={`${styles.btnSecondary} ${
              isSubmitting ? styles.btnDisabled : ""
            }`}
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
