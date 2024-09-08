import React, { useEffect, useState } from 'react';

function ViewCargo() {
    const [cargo, setCargo] = useState([]);

    useEffect(() => {
        const fetchCargo = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cargo');
                const data = await response.json();
                setCargo(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchCargo();
    }, []);

    return (
        <div>
            <h2>Available Cargo</h2>
            <ul>
                {cargo.map((item) => (
                    <li key={item._id}>
                        <strong>Description:</strong> {item.description}, <strong>Weight:</strong> {item.weight}, <strong>Hazardous:</strong> {item.isHazardous ? 'Yes' : 'No'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewCargo;
