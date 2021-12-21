import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Routes, Route} from "react-router-dom"

// All components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Sign-in" element={<SignIn/>}/>
        <Route path="/Sign-up" element={<SignUp/>}/>
      </Routes>
    </>
  );
}

export default App;
