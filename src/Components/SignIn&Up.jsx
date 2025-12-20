import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn&Up.module.css'; 

const SignInUp = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    signUpPassword: false,
    signUpConfirm: false,
    signInPassword: false
  });
  const [isLoading, setIsLoading] = useState({
    signUp: false,
    signIn: false
  });

  const navigate = useNavigate();

  // Check if mobile on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle between Sign In and Sign Up panels
  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  // Handle input changes
  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }
  };

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Validation functions
  const validateSignUp = () => {
    const newErrors = {};

    if (!signUpData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!signUpData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!signUpData.password) {
      newErrors.password = 'Password is required';
    } else if (signUpData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignIn = () => {
    const newErrors = {};

    if (!signInData.email) {
      newErrors.signInEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signInData.email)) {
      newErrors.signInEmail = 'Email is invalid';
    }

    if (!signInData.password) {
      newErrors.signInPassword = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submissions with loading states
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignUp()) return;

    setIsLoading(prev => ({ ...prev, signUp: true }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would make an API call here
      console.log('Sign Up attempt with:', signUpData);
      
      // Simulate successful sign up
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', signUpData.name);
      localStorage.setItem('userEmail', signUpData.email);
      
        navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Sign up failed. Please try again.' });
    } finally {
      setIsLoading(prev => ({ ...prev, signUp: false }));
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignIn()) return;

    setIsLoading(prev => ({ ...prev, signIn: true }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would make an API call here
      console.log('Sign In attempt with:', signInData);
      
      // Simulate successful login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', signInData.email);
      
        navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Sign in failed. Please try again.' });
    } finally {
      setIsLoading(prev => ({ ...prev, signIn: false }));
    }
  };

  // Forgot password handler
  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Password reset functionality would be implemented here');
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className={styles.spinner}></div>
  );

  // Mobile navigation component
  const MobileNavigation = () => (
    <div className={styles.mobileNav} style={{
      display: isMobile ? 'flex' : 'none'
    }}>
      <button 
        onClick={() => setIsRightPanelActive(false)}
        disabled={isLoading.signIn || isLoading.signUp}
        className={!isRightPanelActive ? styles.activeNavButton : styles.navButton}
      >
        Sign In
      </button>
      <button 
        onClick={() => setIsRightPanelActive(true)}
        disabled={isLoading.signIn || isLoading.signUp}
        className={isRightPanelActive ? styles.activeNavButton : styles.navButton}
      >
        Sign Up
      </button>
    </div>
  );

  return (
    <div className={styles.mainContainer}>
      <MobileNavigation />
      <div className={`${styles.container} ${isRightPanelActive ? styles.rightPanelActive : ''}`} id="main">
        {/* Sign Up Form */}
        <div className={styles.signUp}>
          <form onSubmit={handleSignUpSubmit} className={styles.form}>
            <h1 className={styles.heading}>Create Account</h1>
            <p className={styles.subtitle}>or use your email for registration</p>
            
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
              required 
              aria-label="Name"
              value={signUpData.name}
              onChange={handleSignUpChange}
              disabled={isLoading.signUp}
              className={styles.input}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
            
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
              aria-label="Email"
              value={signUpData.email}
              onChange={handleSignUpChange}
              disabled={isLoading.signUp}
              className={styles.input}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
            
            <div className={styles.passwordContainer}>
              <input 
                type={showPassword.signUpPassword ? "text" : "password"} 
                name="password" 
                placeholder="Password" 
                required 
                aria-label="Password"
                value={signUpData.password}
                onChange={handleSignUpChange}
                disabled={isLoading.signUp}
                className={styles.input}
              />
              <span 
                className={styles.passwordToggle}
                onClick={() => !isLoading.signUp && togglePasswordVisibility('signUpPassword')}
                style={{ opacity: isLoading.signUp ? 0.5 : 1, cursor: isLoading.signUp ? 'not-allowed' : 'pointer' }}
              >
                {showPassword.signUpPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            {errors.password && <span className={styles.error}>{errors.password}</span>}
            
            <div className={styles.passwordContainer}>
              <input 
                type={showPassword.signUpConfirm ? "text" : "password"} 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                required 
                aria-label="Confirm Password"
                value={signUpData.confirmPassword}
                onChange={handleSignUpChange}
                disabled={isLoading.signUp}
                className={styles.input}
              />
              <span 
                className={styles.passwordToggle}
                onClick={() => !isLoading.signUp && togglePasswordVisibility('signUpConfirm')}
                style={{ opacity: isLoading.signUp ? 0.5 : 1, cursor: isLoading.signUp ? 'not-allowed' : 'pointer' }}
              >
                {showPassword.signUpConfirm ? 'Hide' : 'Show'}
              </span>
            </div>
            {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
            
            {errors.submit && <span className={`${styles.error} ${styles.submitError}`}>{errors.submit}</span>}
            
            <button 
              type="submit" 
              aria-label="Sign Up Button"
              disabled={isLoading.signUp}
              className={styles.button}
              style={{ 
                opacity: isLoading.signUp ? 0.7 : 1,
                cursor: isLoading.signUp ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading.signUp ? (
                <>
                  <LoadingSpinner />
                  Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className={styles.signIn}>
          <form onSubmit={handleSignInSubmit} className={styles.form}>
            <h1 className={styles.heading}>Sign In</h1>
            <p className={styles.subtitle}>Already have an account?</p>
            
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
              aria-label="Email"
              value={signInData.email}
              onChange={handleSignInChange}
              disabled={isLoading.signIn}
              className={styles.input}
            />
            {errors.signInEmail && <span className={styles.error}>{errors.signInEmail}</span>}
            
            <div className={styles.passwordContainer}>
              <input 
                type={showPassword.signInPassword ? "text" : "password"} 
                name="password" 
                placeholder="Password" 
                required 
                aria-label="Password"
                value={signInData.password}
                onChange={handleSignInChange}
                disabled={isLoading.signIn}
                className={styles.input}
              />
              <span 
                className={styles.passwordToggle}
                onClick={() => !isLoading.signIn && togglePasswordVisibility('signInPassword')}
                style={{ opacity: isLoading.signIn ? 0.5 : 1, cursor: isLoading.signIn ? 'not-allowed' : 'pointer' }}
              >
                {showPassword.signInPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            {errors.signInPassword && <span className={styles.error}>{errors.signInPassword}</span>}
            
            <a 
              href="#" 
              className={styles.forgotPassword} 
              onClick={handleForgotPassword}
              style={{ opacity: isLoading.signIn ? 0.5 : 1 }}
            >
              Forgot Password?
            </a>

            {errors.submit && <span className={`${styles.error} ${styles.submitError}`}>{errors.submit}</span>}
            
            <button 
              type="submit" 
              aria-label="Sign In Button"
              disabled={isLoading.signIn}
              className={styles.button}
              style={{ 
                opacity: isLoading.signIn ? 0.7 : 1,
                cursor: isLoading.signIn ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading.signIn ? (
                <>
                  <LoadingSpinner />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Overlay - hidden on mobile */}
        {!isMobile && (
          <div className={styles.overlayContainer}>
            <div className={styles.overlay}>
              <div className={styles.overlayLeft}>
                <h1 className={styles.overlayHeading}>Welcome Back</h1>
                <p className={styles.overlayText}>To keep connected with us, please login with your personal information.</p>
                <button 
                  className={styles.overlayButton}
                  onClick={handleSignInClick}
                  disabled={isLoading.signIn || isLoading.signUp}
                >
                  Sign In
                </button>
              </div>
              <div className={styles.overlayRight}>
                <h1 className={styles.overlayHeading}>Welcome to EcoSphere</h1>
                <p className={styles.overlayText}>Enter your personal details and start your journey with us.</p>
                <button 
                  className={styles.overlayButton}
                  onClick={handleSignUpClick}
                  disabled={isLoading.signIn || isLoading.signUp}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInUp;