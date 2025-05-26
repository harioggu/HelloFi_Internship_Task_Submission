const API_BASE_URL = process.env.REACT_APP_API_BASE_URL + "/api"; // Uses env variable

export async function fetchDevices() {
  const res = await fetch(`${API_BASE_URL}/devices`, {
    headers: {
      "Content-Type": "application/json", // Inform backend JSON is expected
      // No Authorization header included
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch devices");
  }

  return res.json();
}

export async function submitValuation({ deviceId, conditionAnswers }) {
  const res = await fetch(`${API_BASE_URL}/valuation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // No Authorization header included
    },
    body: JSON.stringify({ deviceId, conditionAnswers }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Valuation submission failed");
  }

  return res.json();
}
