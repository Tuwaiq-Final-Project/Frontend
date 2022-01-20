import React, {useEffect} from "react";

import { Dropdown } from 'react-bootstrap';

import { useNavigate ,useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {removeUser} from "../../reducers/user/actions"


import "./Navbar.css"

export default function Navbar({isNotHomepage}){

    const state = useSelector((state) => {
        return {
        user: state.userReducer.user,
        isLogedIn: state.userReducer.isLogedIn
        };
    });
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const location = useLocation();


    return(
        <div className="Flex">
        <div className="LogoIcon">   
            <picture>
                <source media="(min-width: 650px)" srcSet="barberTimeIcon.png" width="170" height="100"/>
                <img src="smallBarberTimeIcon.png" alt="smallLogo"  width="50" height="50" />
            </picture>
        </div>
        <div className="Navigation">
            <ul>
                {/* For Visitor */}
                { !state.isLogedIn ? 
                <>
                    <li><a className="homeClick" onClick={()=>{navigate("/")}} >Home</a></li> 
                    { location.pathname =="/" &&  <li><a href="#ContactUs">Contact Us</a></li>}
                </>:"" }
                {/* For ADMIN */}
                {state.user.role ==="ADMIN" ? 
                <>
                <li><a onClick={()=>{navigate("/dashboard")}} >Dashboard</a></li>
                <li><a onClick={()=>{navigate("/users")}} >Users</a></li>
                <li><a onClick={()=>{navigate("/services")}} >Services</a></li>
                <li><a onClick={()=>{navigate("/reservations")}} >Reservations</a></li>
                <li><a onClick={()=>{navigate("/messages")}} >Messages</a></li>
                </>
                : ""}
                {/* For USER */}
                { state.user.role ==="USER" ? 
                    <>      
                            <li><a onClick={()=>{navigate("/appointment-reservation")}} >Appointment Reservation</a></li> 
                            <li><a onClick={()=>{navigate("/my-reservations")}} >My Reservations</a></li>    
                    </>
                :""}
            </ul>
        </div>
        <div className="LoginAndSignup">
            {!state.isLogedIn && <button onClick={()=>{navigate("/sign-in")}} className="LoginButton">Log in</button> }
            {!state.isLogedIn && <button onClick={()=>{navigate("/sign-up")}} className="SignupButton">Sign Up</button> }
            {state.isLogedIn && 
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor:'transparent', border:"none", }}>
                {state.user.name}
                </Dropdown.Toggle>
            
                <Dropdown.Menu>
                <Dropdown.Item onClick={()=>{dispatch(removeUser()); navigate("/");}}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            }
        </div>
    </div>
    )
}
