import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {removeUser} from "../../reducers/user/actions"


import "./Navbar.css"

export default function Navbar(){

    const state = useSelector((state) => {
        return {
        user: state.userReducer.user,
        isLogedIn: state.userReducer.isLogedIn
        };
    });
    const dispatch = useDispatch()
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
                {/* Welecome message */}
                { state.isLogedIn  && <li>Welecome {state.user.name}</li>}
                {/* For ADMIN */}
                {state.user.role =="ADMIN" ? 
                <>
                <li><a onClick={()=>{navigate("/dashboard")}} >Dashboard</a></li>
                <li><a onClick={()=>{navigate("/users")}} >Users</a></li>
                <li><a onClick={()=>{navigate("/services")}} >Services</a></li>
                <li><a onClick={()=>{navigate("/reservations")}} >Reservations</a></li>
                <li><a onClick={()=>{navigate("/messages")}} >Messages</a></li>
                </>
                : ""}
                {/* For USER */}
                { state.user.role !="ADMIN" ||  state.user.role == undefined ? 
                    <>
                        <li><a onClick={()=>{navigate("/")}} >Home</a></li> 
                        <li><a >Contact Us</a></li>
                        { state.user.role =="USER" ? 
                            <>
                            <li><a onClick={()=>{navigate("/available-Reservations")}} >Available Reservations</a></li> 
                            <li><a onClick={()=>{navigate("/my-reservations")}} >My Reservations</a></li> 
                            </>
                        : ""}
                    </>
                :""}
            </ul>
        </div>
        <div className="LoginAndSignup">
            {!state.isLogedIn && <button onClick={()=>{navigate("/sign-in")}} className="LoginButton">Sing In</button> }
            {!state.isLogedIn && <button onClick={()=>{navigate("/sign-up")}} className="SignupButton">Sign Up</button> }
            {state.isLogedIn && <button onClick={()=>{dispatch(removeUser())}} className="LoginButton">Log Out</button> }
        </div>
    </div>
    )
}
