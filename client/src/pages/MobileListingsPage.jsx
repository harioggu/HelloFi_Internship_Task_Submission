import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MobileListingsPage.css';

// Sample mobile data
const sampleMobiles = [
    {
        id: '1',
        name: 'iPhone 13 Pro',
        description: 'Latest iPhone with Pro camera system and A15 Bionic chip',
        imageUrl: '/images/iphone_13_image.png',
        basePrice: 82917  // ₹82,917
    },
    {
        id: '2',
        name: 'Samsung Galaxy S21',
        description: 'Powerful Android flagship with amazing camera capabilities',
        imageUrl: '/images/galaxy.webp',
        basePrice: 66317  // ₹66,317
    },
    {
        id: '3',
        name: 'Google Pixel 6',
        description: 'Best camera phone with pure Android experience',
        imageUrl: '/images/pixel.jpg',
        basePrice: 49717  // ₹49,717
    },
    {
        id: '4',
        name: 'OnePlus 9',
        description: 'Flagship killer with Hasselblad camera system',
        imageUrl: '/images/oneplus.webp',
        basePrice: 58017  // ₹58,017
    },
    {
        id: '5',
        name: 'iPhone 16',
        description: 'Newest iPhone with advanced features and design.',
        imageUrl: '/images/iphone_16.webp',
        basePrice: 107817  // ₹1,07,817
    }
];

const MobileListingsPage = ({ isAuthenticated, isLoading }) => {
    const [mobiles, setMobiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMobiles();
    }, []);

    const fetchMobiles = async () => {
        try {
            // You can replace this with a real API call if needed
            setMobiles(sampleMobiles);
        } catch (error) {
            setMobiles(sampleMobiles);
        } finally {
            setLoading(false);
        }
    };

    const handleMobileClick = (mobileId) => {
        if (!isAuthenticated) {
            localStorage.setItem('selectedMobile', mobileId);
            navigate('/login');
        } else {
            navigate(`/valuation/${mobileId}`);
        }
    };

    if (loading || isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="mobile-listings-container">
            <h1>Available Mobiles</h1>
            <div className="mobile-grid">
                {mobiles.map((mobile) => (
                    <div 
                        key={mobile.id} 
                        className="mobile-card"
                        onClick={() => handleMobileClick(mobile.id)}
                    >
                        <img 
                            src={mobile.imageUrl} 
                            alt={mobile.name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/300x200?text=Mobile+Image';
                            }}
                        />
                        <h3>{mobile.name}</h3>
                        <p>{mobile.description}</p>
                        <p className="price">₹{mobile.basePrice.toLocaleString('en-IN')}</p>
                        {!isAuthenticated && (
                            <div className="login-prompt">
                                Click to login and get valuation
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MobileListingsPage; 