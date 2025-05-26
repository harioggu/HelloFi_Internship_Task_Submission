import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";

const mobiles = [
  {
    id: "iphone-13",
    name: "iPhone 13",
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-01.jpg",
  },
  {
    id: "samsung-s22",
    name: "Samsung Galaxy S22",
    image: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-5g-1.jpg",
  },
  {
    id: "oneplus-10",
    name: "OnePlus 10 Pro",
    image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-10-pro-1.jpg",
  },
  {
    id: "pixel-6",
    name: "Google Pixel 6",
    image: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-6-1.jpg",
  },
];

const MainPage = () => {
  const [selectedMobile, setSelectedMobile] = useState(null);
  const [condition, setCondition] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [price, setPrice] = useState(null);
  const navigate = useNavigate();

  const handleMobileClick = (mobile) => {
    if (!authService.isLoggedIn()) {
      // Store selected mobile in localStorage before redirecting
      localStorage.setItem("selectedMobile", JSON.stringify(mobile));
      navigate("/login");
      return;
    }
    setSelectedMobile(mobile);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you'll make the API call to get valuation
      // For now, we'll just show a mock price
      const mockPrice = calculateMockPrice(selectedMobile.id, condition);
      setPrice(mockPrice);
    } catch (error) {
      console.error("Valuation error:", error);
    }
  };

  const calculateMockPrice = (deviceId, condition) => {
    const basePrices = {
      "iphone-13": 80000,
      "samsung-s22": 70000,
      "oneplus-10": 50000,
      "pixel-6": 45000,
    };

    const conditionMultipliers = {
      "Excellent": 0.9,
      "Good": 0.8,
      "Fair": 0.6,
      "Poor": 0.4,
    };

    return Math.round(basePrices[deviceId] * conditionMultipliers[condition]);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Select Your Mobile</h2>
      <div style={styles.grid}>
        {mobiles.map((mobile) => (
          <div
            key={mobile.id}
            style={{
              ...styles.card,
              border: selectedMobile?.id === mobile.id ? "2px solid #2563EB" : "1px solid #eee",
            }}
            onClick={() => handleMobileClick(mobile)}
          >
            <img src={mobile.image} alt={mobile.name} style={styles.image} />
            <div style={styles.mobileName}>{mobile.name}</div>
          </div>
        ))}
      </div>
      {showForm && selectedMobile && !price && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3>Enter Condition for {selectedMobile.name}</h3>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select Condition</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
          <button type="submit" style={styles.button}>
            Get Final Price
          </button>
        </form>
      )}
      {price && (
        <div style={styles.priceCard}>
          <h3>Valuation Result</h3>
          <p style={styles.price}>₹{price.toLocaleString()}</p>
          <button 
            onClick={() => {
              setPrice(null);
              setSelectedMobile(null);
              setCondition("");
              setShowForm(false);
            }} 
            style={styles.button}
          >
            Value Another Device
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 900,
    margin: "2rem auto",
    padding: "2rem",
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#2563EB",
    fontWeight: 700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  card: {
    background: "#f9f9f9",
    borderRadius: 8,
    padding: "1rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "box-shadow 0.2s, border 0.2s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  image: {
    width: "100%",
    height: 140,
    objectFit: "contain",
    marginBottom: 12,
  },
  mobileName: {
    fontWeight: 600,
    color: "#333",
    fontSize: "1rem",
  },
  form: {
    margin: "2rem auto 0 auto",
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    background: "#f4f8ff",
    padding: "1.5rem",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
  },
  select: {
    padding: "0.75rem 1rem",
    borderRadius: 6,
    border: "1.5px solid #2563EB",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#2563EB",
    color: "#fff",
    fontWeight: "600",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  priceCard: {
    margin: "2rem auto 0 auto",
    maxWidth: 400,
    background: "#f4f8ff",
    padding: "1.5rem",
    borderRadius: 8,
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
  },
  price: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#2563EB",
    margin: "1rem 0",
  },
};

export default MainPage; 