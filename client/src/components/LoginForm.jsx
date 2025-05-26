import React, { useState } from "react";

const LoginForm = ({ onLogin, disabled }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    onLogin({ email, password });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          autoComplete="username"
          required
          disabled={disabled}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          autoComplete="current-password"
          required
          disabled={disabled}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button 
          type="submit" 
          style={{
            ...styles.button,
            opacity: disabled ? 0.7 : 1,
            cursor: disabled ? "not-allowed" : "pointer"
          }}
          disabled={disabled}
        >
          {disabled ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 360,
    margin: "auto",
    padding: "2rem",
    borderRadius: 8,
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: "1.5rem",
    color: "#333",
    textAlign: "center",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem 1rem",
    borderRadius: 6,
    border: "1.5px solid #ccc",
    fontSize: "1rem",
    transition: "border-color 0.3s",
    "&:focus": {
      borderColor: "#2563EB",
      outline: "none",
    },
    "&:disabled": {
      backgroundColor: "#f3f4f6",
      cursor: "not-allowed",
    },
  },
  error: {
    color: "crimson",
    fontSize: "0.9rem",
    textAlign: "center",
    margin: 0,
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#2563EB",
    color: "#fff",
    fontWeight: "600",
    borderRadius: 6,
    border: "none",
    fontSize: "1rem",
    transition: "all 0.3s",
    "&:hover:not(:disabled)": {
      backgroundColor: "#1d4ed8",
    },
  },
};

export default LoginForm;
