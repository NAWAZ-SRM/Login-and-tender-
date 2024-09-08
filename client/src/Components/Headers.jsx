import React, { useEffect } from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Headers = ({ userdata, setUserdata }) => {
    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/login/sucess', { withCredentials: true });
            setUserdata(response.data.user);  // Set the user data
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <header>
            <nav>
                <div className="left">
                    <h1>Login check</h1>
                </div>
                <div className="right">
                    <ul>
                        <li>
                            <NavLink to="/home">Tender</NavLink>
                        </li>
                        {userdata?.displayName ? (
                            <>
                                <li style={{ color: 'black', fontWeight: 'bold' }}>{userdata?.displayName}</li>
                                <li>
                                    <NavLink to="/dashboard">Home</NavLink>
                                </li>
                                <li onClick={() => window.open('http://localhost:5000/logout', '_self')}>Logout</li>
                                <li>
                                    <img src={userdata?.image} style={{ width: '50px', borderRadius: '50%' }} alt="" />
                                </li>
                            </>
                        ) : (
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Headers;
