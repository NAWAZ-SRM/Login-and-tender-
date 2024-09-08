import React, { useState } from 'react';

function BidForm({ cargoId }) {
    const [bidAmount, setBidAmount] = useState('');
    const [companyName, setCompanyName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/bids', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cargoId, bidAmount, companyName }),
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
                <label>Company Name:</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
            </div>
            <div>
                <label>Bid Amount:</label>
                <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} required />
            </div>
            <button type="submit">Submit Bid</button>
        </form>
    );
}

export default BidForm;
