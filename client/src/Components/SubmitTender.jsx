import React, { useState } from 'react';
import axios from 'axios';

const SubmitTender = ({ cargoId }) => {
    const [companyName, setCompanyName] = useState('');
    const [quote, setQuote] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/tender', { cargoId, companyName, quote });
            alert('Tender Submitted!');
        } catch (error) {
            console.error('Error submitting tender:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
            <input type="number" placeholder="Quote" value={quote} onChange={(e) => setQuote(e.target.value)} required />
            <button type="submit">Submit Tender</button>
        </form>
    );
};

export default SubmitTender;
