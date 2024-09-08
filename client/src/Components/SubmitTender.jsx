import React, { useState } from 'react';
import axios from 'axios';

const SubmitTender = ({ cargoId }) => {
    const [companyName, setCompanyName] = useState('');
    const [quote, setQuote] = useState(0);
    const [userdata, setUserdata] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get("http://localhost:5000/login/success", { withCredentials: true });
                setUserdata(response.data.user);
                setCompanyName(response.data.user.username);
            } catch (error) {
                console.log("error", error)
            }
        }
        getUser();
    }, []);

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
            <input type="number" placeholder="Quote" value={quote} onChange={(e) => setQuote(e.target.value)} required />
            <button type="submit">Submit Tender</button>
        </form>
    );
};

export default SubmitTender;
