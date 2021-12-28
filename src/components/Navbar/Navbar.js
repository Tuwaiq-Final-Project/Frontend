import React, {useRef ,useEffect} from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {removeUser} from "../../reducers/user/actions"


import "./Navbar.css"

export default function Navbar(){

    const listElement = useRef(null);

    useEffect(() => {
        
        window.onscroll = function() {
            "use strict";
            if (document.body.scrollTop >= 10 || document.documentElement.scrollTop >= 10) {
            listElement.current.classList.add("scroll");
            } else {
            listElement.current.classList.remove("scroll");
            }
        };
    },[]);


    const state = useSelector((state) => {
        return {
        user: state.userReducer.user,
        isLogedIn: state.userReducer.isLogedIn
        };
    });
    const dispatch = useDispatch()
    let navigate = useNavigate();

    return(
        <div className="Flex" ref={listElement}>
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
                    <li><a onClick={()=>{navigate("/")}} >Home</a></li> 
                    <li><a href="#ContactUs">Contact Us</a></li>
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
                            <li><a onClick={()=>{navigate("/available-Reservations")}} >Available Reservations</a></li> 
                            <li><a onClick={()=>{navigate("/my-reservations")}} >My Reservations</a></li>    
                    </>
                :""}
            </ul>
        </div>
        <div className="LoginAndSignup">
            {!state.isLogedIn && <button onClick={()=>{navigate("/sign-in")}} className="LoginButton">Log in</button> }
            {!state.isLogedIn && <button onClick={()=>{navigate("/sign-up")}} className="SignupButton">Sign Up</button> }
            {state.isLogedIn && <button onClick={()=>{dispatch(removeUser())}} className="LoginButton">{state.user.name}</button> }
        </div>
    </div>
    )
}
