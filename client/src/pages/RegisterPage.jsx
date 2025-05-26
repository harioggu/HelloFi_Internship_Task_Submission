import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import * as authService from "../services/authService";

const RegisterPage = ({ onRegister }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (data) => {
    try {
      setError("");
      setSuccess("");
      await authService.register(data);
      setSuccess("Registration successful! You can now login.");
      
      // Call onRegister to update login state in App
      if (onRegister) {
        onRegister();
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <RegisterForm onRegister={handleRegister} />
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#e0e7ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 10,
    boxShadow: "0 8px 24px rgba(37, 99, 235, 0.2)",
    padding: "2rem",
  },
  error: {
    color: "crimson",
    marginTop: "1rem",
    textAlign: "center",
  },
  success: {
    color: "green",
    marginTop: "1rem",
    textAlign: "center",
  },
};

export default RegisterPage;
