import React, { useState, useEffect } from 'react';
// import PostCargo from './Postcargo'; // Ensure correct import path
import BidForm from './BidForm';
import emailjs from '@emailjs/browser';

function BidCargo({ userdata }) {
    const [cargoList, setCargoList] = useState([]);
    const [selectedCargo, setSelectedCargo] = useState(null);

    useEffect(() => {
        const fetchCargoList = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cargo'); // Ensure this URL matches the backend route
                if (!response.ok) {
                    throw new Error('Failed to fetch cargo list');
                }
                const data = await response.json();
                setCargoList(data); // Set the fetched cargo list in the state
            } catch (error) {
                console.error('Error fetching cargo list:', error);
                alert('Failed to load cargo list. Please check the server or try again later.');
            }
        };
    
        fetchCargoList();
    }, []);
    
    const handleCargoSelect = async (cargoId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cargo/${cargoId}`); // Correct URL
            if (!response.ok) {
                throw new Error('Failed to fetch cargo details');
            }
            const data = await response.json();
            setSelectedCargo(data);
        } catch (error) {
            console.error('Error fetching cargo details:', error);
            alert('Failed to load cargo details. Please check the server or try again later.');
        }
    };

    return (
        <div>
            <h1>Welcome to the Tender System</h1>
            
            <div>
                <h2>Posted Cargo</h2>
                <ul>
                    {cargoList.length > 0 ? (
                        cargoList.map(cargo => (
                            <li key={cargo._id}>
                                <h3>{cargo.title}</h3>
                                <p>{cargo.description}</p>
                                <p>Weight: {cargo.weight}</p>
                                <p>Hazardous: {cargo.isHazardous ? 'Yes' : 'No'}</p>
                                <p>Estimated Price: ${cargo.estimatedPrice}</p> {/* Display the estimated price */}
                                <button onClick={() => handleCargoSelect(cargo._id)}>
                                    View and Bid
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>No cargo available</p>
                    )}
                </ul>
            </div>
            
            {selectedCargo && (
                <div>
                    <h2>Place a Bid for {selectedCargo.title}</h2>
                    <BidForm userdata={userdata} cargoId={selectedCargo._id} />
                    <h2>Bids</h2>
                    <BidsList cargoId={selectedCargo._id} cargoName={selectedCargo.title} userMail={userdata}/>
                </div>
            )}
        </div>
    );
}

// Older version of fetching cargo list and details without lowest bid
// function BidsList({ cargoId }) {
//     const [bids, setBids] = useState([]);

//     useEffect(() => {
//         const fetchBids = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/bids/${cargoId}`);
//                 if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//                 const data = await response.json();
//                 console.log('Bids List:', data);  // Debugging line
//                 setBids(data);
//             } catch (error) {
//                 console.error('Error fetching bids:', error);
//                 alert('Failed to load bids');
//             }
//         };

//         fetchBids();
//     }, [cargoId]);



//     return (
//         <ul>
//             {bids.map(bid => (
//                 <li key={bid._id}>
//                     {bid.companyName}: ${bid.bidAmount} (Bid Date: {new Date(bid.bidDate).toLocaleDateString()})
//                 </li>
//             ))}
//         </ul>
//     );
// }

// New version with the lowest bid option

// function BidsList({ cargoId }) {
//     const [bids, setBids] = useState([]);
//     const [lowestBid, setLowestBid] = useState(null);

//     useEffect(() => {
//         const fetchBids = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/bids/${cargoId}`);
//                 if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//                 const data = await response.json();
//                 console.log('Bids List:', data);  // Debugging line
//                 setBids(data);

//                 // Find the lowest bid
//                 if (data.length > 0) {
//                     const lowest = data.reduce((min, bid) => bid.bidAmount < min.bidAmount ? bid : min, data[0]);
//                     setLowestBid(lowest);
//                 }
//             } catch (error) {
//                 console.error('Error fetching bids:', error);
//                 alert('Failed to load bids');
//             }
//         };

//         fetchBids();
//     }, [cargoId]);

//     const sendEmailToLowestBid = () => {
//         if (lowestBid) {
//             const templateParams = {
//                 to_name: lowestBid.companyName,
//                 to_email: lowestBid.email,
//                 subject: 'Lowest Bid Notification',
//                 message_html: `Congratulations, your bid of $${lowestBid.bidAmount} is the lowest bid for the cargo.`,
//             };

//             emailjs.send(
//                 '-fnoELV-sMb2n1XaV',
//                 'template_e2qlr2m',
//                 templateParams
//             ).then(
//                 (response) => {
//                     console.log('SUCCESS!', response.status, response.text);
//                 },
//                 (err) => {
//                     console.log('FAILED...', err);
//                 }
//             );
//         }
//     };

//     return (
//         <div>
//             {lowestBid && (
//                 <h1>Lowest Bid: {lowestBid.companyName} - ${lowestBid.bidAmount}</h1>
//             )}
//             <ul>
//                 {bids.map(bid => (
//                     <li key={bid._id}>
//                         {bid.companyName}: ${bid.bidAmount} (Bid Date: {new Date(bid.bidDate).toLocaleDateString()})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
function BidsList({ cargoId,cargoName, userMail }) {
    const [bids, setBids] = useState([]);
    const [lowestBid, setLowestBid] = useState(null);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/bids/${cargoId}`);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                console.log('Bids List:', data);  // Debugging line
                setBids(data);

                // Find the lowest bid
                if (data.length > 0) {
                    const lowest = data.reduce((min, bid) => bid.bidAmount < min.bidAmount ? bid : min, data[0]);
                    setLowestBid(lowest);
                }
            } catch (error) {
                console.error('Error fetching bids:', error);
                alert('Failed to load bids');
            }
        };

        fetchBids();
    }, [cargoId]);

    useEffect(() => {
        if (lowestBid) {
            const emailCargoKey = `${userMail.email}_${cargoId}`;
            const lastEmailSentTime = localStorage.getItem(emailCargoKey);
            const currentTime = new Date().getTime();
            if (!lastEmailSentTime || (currentTime - lastEmailSentTime > 3600000)){
                const templateParams = {
                    to_name: lowestBid.companyName,
                    to_email: userMail.email,
                    item_name: cargoName,
                    bid_amount: lowestBid.bidAmount
                };
    
                emailjs.send(
                    'service_yvu0yx7',
                    'template_e2qlr2m',
                    templateParams,
                    '-fnoELV-sMb2n1XaV'
                ).then(
                    (response) => {
                        console.log('SUCCESS!', response.status, response.text);
                        console.log(userMail.email)
                        localStorage.setItem(emailCargoKey, currentTime);
                    },
                    (err) => {
                        console.log('FAILED...', err);
                    }
                );
            }else {
                console.log('Email not sent: Cooldown period of 1 hour not passed.');
            }
            
        }
    }, [lowestBid]);

    return (
        <div>
            {lowestBid && (
                <h1>Lowest Bid: {lowestBid.companyName} - ${lowestBid.bidAmount}</h1>
            )}
            <ul>
                {bids.map(bid => (
                    <li key={bid._id}>
                        {bid.companyName}: ${bid.bidAmount} (Bid Date: {new Date(bid.bidDate).toLocaleDateString()})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BidCargo;
