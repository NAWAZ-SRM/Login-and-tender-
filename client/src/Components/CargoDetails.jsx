import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BidForm from './BidForm';

function CargoDetails() {
    const { id } = useParams();
    const [cargo, setCargo] = useState(null);
    const [bids, setBids] = useState([]);

    useEffect(() => {
        const fetchCargo = async () => {
            const response = await fetch(`http://localhost:5000/api/cargo/${id}`);
            const data = await response.json();
            setCargo(data);
        };

        const fetchBids = async () => {
            const response = await fetch(`http://localhost:5000/api/bids/${id}`);
            const data = await response.json();
            setBids(data);
        };

        fetchCargo();
        fetchBids();
    }, [id]);

    return (
        <div>
            {cargo && (
                <div>
                    <h1>{cargo.title}</h1>
                    <p>{cargo.description}</p>
                    <p>Weight: {cargo.weight}</p>
                    <p>Hazardous: {cargo.isHazardous ? 'Yes' : 'No'}</p>
                </div>
            )}
            <h2>Place a Bid</h2>
            <BidForm cargoId={id} />
            <h2>Bids</h2>
            <ul>
                {bids.map(bid => (
                    <li key={bid._id}>
                        {bid.companyName}: ${bid.bidAmount} (Bid Date: {new Date(bid.timestamp).toLocaleDateString()})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CargoDetails;
