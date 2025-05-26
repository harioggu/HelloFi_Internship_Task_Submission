import React, { useState } from "react";
import DeviceForm from "../components/DeviceForm";
import PriceResult from "../components/PriceResult";
import * as deviceService from "../services/deviceService";

// Map device IDs to user-friendly names
const deviceNames = {
  "iphone-xr": "iPhone XR",
  "samsung-s22": "Samsung S22",
  "oneplus-8": "OnePlus 8",
  "pixel-5": "Google Pixel 5",
};

const ValuationPage = () => {
  const [price, setPrice] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setError("");
    setLoading(true);
    setPrice(null);
    setDeviceId(null);

    try {
      const result = await deviceService.submitValuation(data);
      setPrice(result.price);
      setDeviceId(data.deviceId);
    } catch (err) {
      setError(err.message || "Failed to get valuation");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPrice(null);
    setDeviceId(null);
    setError("");
  };

  return (
    <div style={styles.page}>
      {!price ? (
        <>
          <DeviceForm onSubmit={handleSubmit} />
          {loading && <p>Loading valuation...</p>}
          {error && <p style={styles.error}>{error}</p>}
        </>
      ) : (
        <PriceResult
          price={price}
          deviceName={deviceNames[deviceId] || "Unknown Device"}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  },
  error: {
    color: "crimson",
    marginTop: "1rem",
    textAlign: "center",
  },
};

export default ValuationPage;
