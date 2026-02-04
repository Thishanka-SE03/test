import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../Components/ResetPassword.module.css";
import logo from "../assets/images/logo.png";

// Background images (reuse)
import bg1 from "../Components/Images/Caro1.jpg";
import bg2 from "../Components/Images/Caro2.jpg";
import bg3 from "../Components/Images/Caro3.jpg";
import bg4 from "../Components/Images/Caro4.jpg";
import bg5 from "../Components/Images/Caro5.jpg";

const backgroundImages = [bg1, bg2, bg3, bg4, bg5];

const EmailConfirmed = () => {
  const [index, setIndex] = useState(0);

  // Preload images
  useEffect(() => {
    backgroundImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Background shuffle
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  // IMPORTANT: prevent auto-login after confirmation
  useEffect(() => {
    supabase.auth.signOut();
  }, []);

  return (
    <main className={styles.landingPage}>
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className={styles.bgImage}
          style={{ backgroundImage: `url(${backgroundImages[index]})` }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className={styles.overlay} />

      <section className={styles.content}>
        <div className={styles.innerContent}>
          <header className={styles.header}>
            <img src={logo} alt="EcoSphere Logo" className={styles.logo} />
          </header>

          <div className={styles.welcomeSection}>
            <h2 className={styles.heroTitle}>Email Confirmed 🎉</h2>
            <p className={styles.heroSubtitle}>
              Thank you for confirming your email address.
              <br />
              Please log back into the <b>EcoSphere app</b> to continue.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EmailConfirmed;
