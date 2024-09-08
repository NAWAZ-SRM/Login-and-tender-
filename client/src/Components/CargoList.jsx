import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubmitTender from './SubmitTender';

const CargoList = () => {
    const [cargoList, setCargoList] = useState([]);

    useEffect(() => {
        const fetchCargo = async () => {
            const res = await axios.get('http://localhost:5000/api/cargo');
            setCargoList(res.data);
        };
        fetchCargo();
    }, []);

    return (
        <div>
            {cargoList.map(cargo => (
                <div key={cargo._id}>
                    <h3>{cargo.title}</h3>
                    <p>{cargo.weight} kg - Hazardous: {cargo.hazardous ? 'Yes' : 'No'}</p>
                    <SubmitTender cargoId={cargo._id} />
                </div>
            ))}
        </div>
    );
};

export default CargoList;
