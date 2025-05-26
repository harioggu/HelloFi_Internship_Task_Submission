import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import * as authService from "./services/authService";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MobileListingsPage from "./pages/MobileListingsPage";
import MobileValuationPage from "./pages/MobileValuationPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const status = await authService.checkAuthStatus();
      setIsAuthenticated(status);
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      window.location.href = "/";
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Add a handler to re-check authentication after login
  const handleLoginSuccess = async () => {
    setIsLoading(true);
    await checkAuthStatus();
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Mobiles</Link>
        {!isAuthenticated && <Link to="/login" style={styles.link}>Login</Link>}
        {!isAuthenticated && <Link to="/register" style={styles.link}>Register</Link>}
        {isAuthenticated && (
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        )}
      </nav>

      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<MobileListingsPage isAuthenticated={isAuthenticated} isLoading={isLoading} />} />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage onRegisterSuccess={handleLoginSuccess} />} 
          />
          <Route 
            path="/valuation/:mobileId" 
            element={<MobileValuationPage />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

const styles = {
  nav: {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#2563EB",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    transition: "background-color 0.2s",
  },
  container: {
    padding: "1rem",
  },
  logoutButton: {
    backgroundColor: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    marginLeft: "auto",
    minWidth: "80px",
    transition: "background-color 0.2s",
  },
};

export default App;
