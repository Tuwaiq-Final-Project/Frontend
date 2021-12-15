import { useNavigate } from "react-router-dom";

import "./Navbar.css"

export default function Navbar(){

    let navigate = useNavigate();

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
                <li><a onClick={()=>{navigate("/")}} >Home</a></li>
                <li><a >Contact Us</a></li>
            </ul>
        </div>
        <div className="LoginAndSignup">
            <button onClick={()=>{navigate("/Sign-in")}} className="LoginButton">Login</button>
            <button onClick={()=>{navigate("/Sign-up")}} className="SignupButton">Signup</button>
        </div>
    </div>
    )
}