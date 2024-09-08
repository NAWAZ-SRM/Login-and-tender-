import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Headers from './Headers';
const Home = () => {

  const navigate = useNavigate();

  const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:5000/login/sucess", { withCredentials: true });

        console.log("response",response)
    } catch (error) {
      navigate("*")
    }
}


useEffect(() => {
  getUser()
}, [])
 // Hook to handle navigation

return (
    <div>
        <h1>Welcome to the Tender System</h1>
        <button onClick={() => navigate('/PostCargo')}>
            Post Cargo
        </button>
        <button onClick={() => navigate('/BidCargo')}>
            Bid Cargo
        </button>
    </div>
);
}

export default Home