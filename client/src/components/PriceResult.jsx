import React from "react";

const PriceResult = ({ price, deviceName, onReset }) => {
  if (price == null) return null; // Hide if no price yet

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Estimated Price</h2>
      <p style={styles.device}>
        Device: <strong>{deviceName}</strong>
      </p>
      <p style={styles.price}>₹ {price.toLocaleString()}</p>
      <button style={styles.button} onClick={onReset}>
        Evaluate Another Device
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 360,
    margin: "1.5rem auto",
    padding: "1.5rem",
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    color: "#2563EB",
  },
  device: {
    fontSize: "1.1rem",
    marginBottom: "0.5rem",
    color: "#374151",
  },
  price: {
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
    color: "#059669",
  },
  button: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#2563EB",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
};

export default PriceResult;
