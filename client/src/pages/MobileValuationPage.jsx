import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { checkAuthStatus as checkAuth, getAuthHeaders } from '../services/authService';
import '../styles/MobileValuationPage.css';

const conditions = {
    screen: ["Perfect", "Minor scratches", "Cracked"],
    battery: ["Good", "Average", "Poor"],
    body: ["Perfect", "Scratched", "Damaged"]
};

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MobileValuationPage = () => {
    const { mobileId } = useParams();
    const [mobile, setMobile] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [price, setPrice] = useState(null);
    const [conditionAnswers, setConditionAnswers] = useState({
        screen: conditions.screen[0],
        body: conditions.body[0],
        battery: conditions.battery[0]
    });
    const navigate = useNavigate();

    useEffect(() => {
        verifyAuth();
        fetchMobileDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mobileId]);

    const verifyAuth = async () => {
        try {
            const status = await checkAuth();
            setIsAuthenticated(status);
            if (!status) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            navigate('/login');
        }
    };

    const fetchMobileDetails = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/mobiles/${mobileId}`, {
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch mobile details');
            const data = await response.json();
            setMobile(data);
        } catch (error) {
            setError('Failed to load mobile details');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleConditionChange = (e) => {
        const { name, value } = e.target;
        setConditionAnswers(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            localStorage.setItem('valuationState', JSON.stringify({
                mobileId,
                conditionAnswers
            }));
            navigate('/login');
            return;
        }
        if (!conditionAnswers.screen || !conditionAnswers.body || !conditionAnswers.battery) {
            setError('Please select a condition for all fields.');
            return;
        }
        setError('');
        setPrice(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/valuation/calculate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                },
                body: JSON.stringify({
                    mobileId,
                    conditionAnswers
                })
            });

            // Defensive: Only parse JSON if there is content
            const text = await response.text();
            let data = {};
            try {
                data = text ? JSON.parse(text) : {};
            } catch (err) {
                setError('Server returned an invalid response.');
                return;
            }

            if (!response.ok) {
                setError(data.message || 'Failed to calculate price');
                return;
            }
            setPrice(data.price);
        } catch (error) {
            setError(error.message || 'Failed to calculate price');
            console.error('Error:', error);
        }
    };

    const handleReset = () => {
        setPrice(null);
        setConditionAnswers({
            screen: conditions.screen[0],
            body: conditions.body[0],
            battery: conditions.battery[0]
        });
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!mobile) {
        return <div className="error">Mobile not found</div>;
    }

    return (
        <div className="valuation-container">
            <div className="valuation-card">
                <h2>Device Valuation</h2>
                {!price ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mobile-info">
                            <img src={mobile.imageUrl} alt={mobile.name} />
                            <h3>{mobile.name}</h3>
                        </div>

                        {Object.entries(conditions).map(([key, options]) => (
                            <div key={key} className="form-group">
                                <label>
                                    {key.charAt(0).toUpperCase() + key.slice(1)} Condition
                                    <select
                                        name={key}
                                        value={conditionAnswers[key]}
                                        onChange={handleConditionChange}
                                    >
                                        {options.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        ))}

                        <button type="submit" disabled={loading}>
                            {loading ? 'Calculating...' : 'Get Price'}
                        </button>
                    </form>
                ) : (
                    <div className="price-result">
                        <h3>Estimated Value</h3>
                        <div className="price">₹{price && price.toLocaleString('en-IN')}</div>
                        <button onClick={handleReset}>Value Another Device</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileValuationPage; 