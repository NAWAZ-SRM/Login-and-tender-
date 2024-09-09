import './App.css';
import Home from './Components/Home';
import Headers from './Components/Headers';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Error from './Components/Error';
import BidCargo from './Components/BidCargo';
import PostCargo from './Components/Postcargo';
import Chat from './Components/Chat'
import Details from './Components/Details'
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== '/login' && location.pathname !== '/';
  const [userdata, setUserdata] = useState({}); // Store user data here

  // Debugging: log userdata in App.jsx
  console.log('Userdata in App:', userdata);

  return (
    <>
      {shouldShowNavbar && <Headers userdata={userdata} setUserdata={setUserdata} />}
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='*' element={<Error />} />
        <Route path="/BidCargo" element={<BidCargo userdata={userdata} />} /> {/* Passing userdata */}
        <Route path="/PostCargo" element={<PostCargo />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Details" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
