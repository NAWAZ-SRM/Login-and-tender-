import React, { useState, useEffect } from 'react';

function BidForm({ cargoId, userdata }) {
    const [bidAmount, setBidAmount] = useState('');
    const [companyName, setCompanyName] = useState('');

    // Debugging: log userdata to check if it is passed correctly
    useEffect(() => {
        console.log('Userdata in BidForm:', userdata); // Check if userdata is being passed
        if (userdata && userdata.displayName) {
            setCompanyName(userdata.displayName);
        }
    }, [userdata]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const timestamp = new Date().getTime();
            const response = await fetch('http://localhost:5000/api/bids', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cargoId, bidAmount, companyName, timestamp }),
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            alert('Bid submitted successfully');
        } catch (error) {
            console.error('Error submitting bid:', error);
            alert('Failed to submit bid. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Company Name: {companyName || 'Loading...'}</label> {/* Show loading until it is set */}
            </div>
            <div>
                <label>Bid Amount:</label>
                <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit Bid</button>
        </form>
    );
}

export default BidForm;
