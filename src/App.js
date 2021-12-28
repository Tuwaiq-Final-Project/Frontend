import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Routes, Route,useLocation} from "react-router-dom"

// All components
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import Messages from './components/Admin/Messages/Messages';
import Users from './components/Admin/Users/Users';
import Services from './components/Admin/Services/Services';
import Reservations from './components/Admin/Reservations/Reservations';
import AvailableReservations from './components/User/AvailableReservations/AvailableReservations';
import MyReservations from './components/User/MyReservations/MyReservations';
import Navbar from './components/Navbar/Navbar';


function App() {

  const location = useLocation();

  return (
    <>
    {/* امرر البروبس للناف بار بدال ما يكون 2 ناف  */}
    { location.pathname !="/" && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/messages" element={<Messages/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/reservations" element={<Reservations/>}/>
        <Route path="/available-Reservations" element={<AvailableReservations/>}/>
        <Route path="/my-reservations" element={<MyReservations/>}/>
      </Routes>
    </>
  );
}

export default App;
