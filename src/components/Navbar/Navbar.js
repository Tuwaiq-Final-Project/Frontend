import "./Navbar.css"

function Navbar(){

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
                <li><a href="#home">Home</a></li>
                <li><a href="#APIinfo">Contact Us</a></li>
            </ul>
        </div>
        <div className="LoginAndSignup">
            <button className="LoginButton">Login</button>
            <button className="SignupButton">Signup</button>
        </div>
    </div>
    )
}

export default Navbar;