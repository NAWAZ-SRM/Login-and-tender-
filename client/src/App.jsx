import './App.css';
import Home from './Components/Home';
import Headers from './Components/Headers';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Error from './Components/Error';
import BidCargo from './Components/BidCargo';
import PostCargo from './Components/Postcargo';
import { Routes, Route,useLocation } from "react-router-dom"

function App() {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== '/login' && location.pathname !== '/';
  return (
    <>
      {shouldShowNavbar && <Headers />}
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Error />} />
        <Route path="/BidCargo" element={<BidCargo />} />
        <Route path="/PostCargo" element={<PostCargo />} />
      </Routes>
    </>
  );
}

export default App;
