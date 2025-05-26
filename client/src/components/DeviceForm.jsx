import React, { useState } from "react";

const devices = [
  { id: "iphone-xr", name: "iPhone XR" },
  { id: "samsung-s22", name: "Samsung S22" },
  { id: "oneplus-8", name: "OnePlus 8" },
  { id: "pixel-5", name: "Google Pixel 5" },
];

const conditions = {
  screen: ["Perfect", "Minor scratches", "Cracked"],
  battery: ["Good", "Average", "Poor"],
  body: ["Perfect", "Scratched", "Damaged"],
};

const DeviceForm = ({ onSubmit }) => {
  const [selectedDevice, setSelectedDevice] = useState(devices[0].id);
  const [answers, setAnswers] = useState({
    screen: conditions.screen[0],
    battery: conditions.battery[0],
    body: conditions.body[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ deviceId: selectedDevice, conditionAnswers: answers });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Device Valuation</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Select Device
          <select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            style={styles.select}
          >
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.name}
              </option>
            ))}
          </select>
        </label>

        {Object.entries(conditions).map(([key, options]) => (
          <label key={key} style={styles.label}>
            {key.charAt(0).toUpperCase() + key.slice(1)} Condition
            <select
              name={key}
              value={answers[key]}
              onChange={handleChange}
              style={styles.select}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}

        <button type="submit" style={styles.button}>
          Get Price
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 400,
    margin: "auto",
    padding: "1.5rem",
    borderRadius: 8,
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: "1.5rem",
    color: "#222",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  label: {
    fontWeight: "500",
    color: "#444",
    display: "flex",
    flexDirection: "column",
    fontSize: "1rem",
  },
  select: {
    marginTop: "0.5rem",
    padding: "0.6rem 1rem",
    fontSize: "1rem",
    borderRadius: 6,
    border: "1.5px solid #ccc",
  },
  button: {
    marginTop: "1rem",
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
};

export default DeviceForm;
