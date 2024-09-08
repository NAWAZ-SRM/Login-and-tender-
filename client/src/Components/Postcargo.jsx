import React, { useState, useEffect } from 'react';

function PostCargo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [weight, setWeight] = useState('');
    const [distance, setDistance] = useState(''); // New field for distance
    const [loadingMeter, setLoadingMeter] = useState('');
    const [isHazardous, setIsHazardous] = useState(false);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [estimatedPrice, setEstimatedPrice] = useState(null);
    const [error, setError] = useState('');
    const [bids, setBids] = useState([]);
    const [cargoId, setCargoId] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0); // Timer state

    useEffect(() => {
        if (cargoId) {
            const interval = setInterval(() => {
                fetchRemainingTime();
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [cargoId]);

    const fetchRemainingTime = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/cargo/${cargoId}/time`);
            if (!response.ok) throw new Error('Failed to fetch remaining time');
            const { remainingTime } = await response.json();
            setTimeLeft(remainingTime);
        } catch (error) {
            console.error('Error fetching remaining time:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const cargoResponse = await fetch('http://localhost:5000/api/cargo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, weight, distance, loadingMeter, isHazardous, origin, destination }),
            });

            if (!cargoResponse.ok) throw new Error('Failed to post cargo');
            alert('Cargo posted successfully');
            const cargoData = await cargoResponse.json();
            setCargoId(cargoData.id);

            const priceResponse = await fetch('http://127.0.0.1:5001/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    weight : parseFloat(weight),
                    // loading_meter: parseFloat(loadingMeter), // Send loading_meter to the Flask API
                    distance: parseFloat(distance),
                    origin: origin,
                    destination: destination
                     
                }),
            });

            if (!priceResponse.ok) throw new Error('Failed to fetch estimated price');
            const priceData = await priceResponse.json();
            setEstimatedPrice(priceData.predictions[0]);
            setError('');

            fetchBids(cargoData.id);
        } catch (error) {
            setError(error.message);
            setEstimatedPrice(null);
        }
    };

    const fetchBids = async (cargoId) => {
        try {
            if (!cargoId) throw new Error('Invalid cargoId');
            const bidsResponse = await fetch(`http://localhost:5000/api/bids/${cargoId}`);
            if (!bidsResponse.ok) throw new Error('Failed to fetch bids');
            const bidsData = await bidsResponse.json();
            setBids(bidsData.bids || []); // Default to empty array if bidsData.bids is undefined
        } catch (error) {
            console.error('Error fetching bids:', error);
            setBids([]); // Clear bids on error
        }
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    };

    return (
        <div>
            <h1>Post Cargo</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <br />
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <br />
                <label>
                    Weight:
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                </label>
                <br />
                <label>
                    Distance:
                    <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} required />
                </label>
                <br />
                <label>
                    Loading Meter:
                    <input type="number" value={loadingMeter} onChange={(e) => setLoadingMeter(e.target.value)} />
                </label>
                <br />
                <label>
                    Origin:
                    <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
                </label>
                <br />
                <label>
                    Destination:
                    <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
                </label>
                <br />
                <label>
                    Hazardous:
                    <input type="checkbox" checked={isHazardous} onChange={(e) => setIsHazardous(e.target.checked)} />
                </label>
                <br />
                <button type="submit">Post Cargo</button>
            </form>

            {cargoId && (
                <div>
                    <h2>Time Left for Cargo Posting</h2>
                    <p>{formatTime(timeLeft)}</p>
                </div>
            )}
        </div>
    );
}

export default PostCargo;
