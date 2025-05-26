const API_BASE_URL = process.env.REACT_APP_API_BASE_URL + "/api/auth"; // Uses env variable

const handleResponse = async (response) => {
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      throw new Error(data.error || data.message || 'Something went wrong');
    }
    throw new Error('Network response was not ok');
  }
  
  // For empty responses (like 204 No Content)
  if (response.status === 204) {
    return null;
  }
  
  // For JSON responses
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  
  return null;
};

const defaultHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

function getToken() {
  return localStorage.getItem('token');
}

export async function register({ name, email, password }) {
  try {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({ name, email, password }),
    });

    const data = await handleResponse(res);
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function login({ email, password }) {
  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(res);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function logout() {
  localStorage.removeItem('token');
}

export async function checkAuthStatus() {
  try {
    const token = getToken();
    if (!token) return false;
    const res = await fetch(`${API_BASE_URL}/check`, {
      method: "GET",
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`
      }
    });
    
    const data = await handleResponse(res);
    return data?.user ? true : false;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}

export function isLoggedIn() {
  return checkAuthStatus();
}

export function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
