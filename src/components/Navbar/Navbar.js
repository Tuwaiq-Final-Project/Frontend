import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {removeUser} from "../../reducers/user/actions"


import "./Navbar.css"

export default function Navbar(){

    const state = useSelector((state) => {
        console.log(state);
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
                { state.isLogedIn  && <li>Welecome {state.user.name}</li>}
                <li><a onClick={()=>{navigate("/")}} >Home</a></li>
                <li><a >Contact Us</a></li>
            </ul>
        </div>
        <div className="LoginAndSignup">
            {!state.isLogedIn && <button onClick={()=>{navigate("/Sign-in")}} className="LoginButton">Sing In</button> }
            {!state.isLogedIn && <button onClick={()=>{navigate("/Sign-up")}} className="SignupButton">Sign Up</button> }
            {state.isLogedIn && <button onClick={()=>{dispatch(removeUser())}} className="LoginButton">Log Out</button> }
        </div>
    </div>
    )
}
