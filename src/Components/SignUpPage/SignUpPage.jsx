import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style/SignupPage.module.css";
import logo from "../../assets/images/logo.png";

// images for background shuffle
import bg1 from "../Images/Caro1.jpg";
import bg2 from "../Images/Caro2.jpg";
import bg3 from "../Images/Caro3.jpg";
import bg4 from "../Images/Caro4.jpg";
import bg5 from "../Images/Caro5.jpg";

const backgroundImages = [bg1, bg2, bg3, bg4, bg5];

const SignupPage = () => {
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: "",
    general: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  // Preload images
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
    const { id, value, type, checked } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }

    // Check password strength in real-time
    if (id === 'password') {
      checkPasswordStrength(value);
    }

    // Clear confirm password error if password changes
    if (id === 'password' && errors.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "",
      }));
    }
  };

  // Check password strength
  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength("");
      return;
    }

    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

    if (strongRegex.test(password)) {
      setPasswordStrength("strong");
    } else if (mediumRegex.test(password)) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("weak");
    }
  };

  // Validation functions
  const validateFirstName = (firstName) => {
    if (!firstName.trim()) return "First name is required";
    if (firstName.length < 2) return "First name must be at least 2 characters";
    return "";
  };

  const validateLastName = (lastName) => {
    if (!lastName.trim()) return "Last name is required";
    if (lastName.length < 2) return "Last name must be at least 2 characters";
    return "";
  };

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

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== password) return "Passwords do not match";
    return "";
  };

  const validateTerms = (agreeToTerms) => {
    if (!agreeToTerms) return "You must agree to the terms and conditions";
    return "";
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {
      firstName: validateFirstName(formData.firstName),
      lastName: validateLastName(formData.lastName),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
      agreeToTerms: validateTerms(formData.agreeToTerms),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call for signup
      console.log("Signup attempt with:", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, you would:
      // const response = await signupAPI(formData);
      // if (response.success) navigate("/login");
      
      // For demo, navigate to login page
      navigate("/login", { 
        state: { 
          message: "Account created successfully! Please log in.",
          email: formData.email 
        } 
      });
      
    } catch (error) {
      console.error("Signup failed:", error);
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Signup failed. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get password strength class
  const getPasswordStrengthClass = () => {
    switch(passwordStrength) {
      case "weak": return styles.passwordWeak;
      case "medium": return styles.passwordMedium;
      case "strong": return styles.passwordStrong;
      default: return "";
    }
  };

  // Get password strength text
  const getPasswordStrengthText = () => {
    switch(passwordStrength) {
      case "weak": return "Weak password";
      case "medium": return "Medium strength";
      case "strong": return "Strong password";
      default: return "";
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
          <Link to="/">
            <img src={logo} alt="EcoSphere Logo" className={styles.logo} />
          </Link>
        </header>
        
        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <h2 className={styles.heroTitle}>Join EcoSphere</h2>
          <p className={styles.heroSubtitle}>
            Create your account to start your sustainable journey
          </p>
        </div>

        {/* Display general error */}
        {errors.general && (
          <div className={styles.errorMessage}>
            {errors.general}
          </div>
        )}

        {/* Signup Form */}
        <form id="signupForm" onSubmit={handleSubmit}>
          {/* Name fields side by side */}
          <div className={styles.nameFields}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
              />
              {errors.firstName && (
                <span className={styles.errorText}>{errors.firstName}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                id="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
              />
              {errors.lastName && (
                <span className={styles.errorText}>{errors.lastName}</span>
              )}
            </div>
          </div>

          {/* Email field */}
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

          {/* Password field with strength indicator */}
          <div className={styles.inputGroup}>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className={`${styles.input} ${errors.password ? styles.inputError : ''} ${getPasswordStrengthClass()}`}
            />
            {formData.password && (
              <div className={`${styles.passwordStrength} ${styles[passwordStrength]}`}>
                <span>{getPasswordStrengthText()}</span>
                <div className={styles.strengthBar}>
                  <div className={styles.strengthFill}></div>
                </div>
              </div>
            )}
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          {/* Confirm Password field */}
          <div className={styles.inputGroup}>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
            />
            {errors.confirmPassword && (
              <span className={styles.errorText}>{errors.confirmPassword}</span>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className={styles.termsGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className={styles.checkboxInput}
              />
              <span className={styles.checkboxText}>
                I agree to the <Link to="/terms" className={styles.termsLink}>Terms of Service</Link> and <Link to="/privacy" className={styles.termsLink}>Privacy Policy</Link>
              </span>
            </label>
            {errors.agreeToTerms && (
              <span className={styles.errorText}>{errors.agreeToTerms}</span>
            )}
          </div>
          
          {/* Submit button */}
          <button 
            type="submit" 
            className={`${styles.btnPrimary} ${isSubmitting ? styles.btnDisabled : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login redirect */}
          <div className={styles.loginRedirect}>
            <p>
              Already have an account?{" "}
              <Link to="/login" className={styles.loginLink}>
                Log in here
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignupPage;