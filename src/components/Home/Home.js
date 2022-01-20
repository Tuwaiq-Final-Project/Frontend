import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import './Home.css'
import { Form,Button,FloatingLabel } from 'react-bootstrap';

import axios from "axios"

import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import toastifyFile from "../React-toastify/index"

import { BiSupport } from 'react-icons/bi';
import { HiUsers, HiCursorClick } from 'react-icons/hi';
import { MdLocationOn, MdEmail} from 'react-icons/md';
import { BsFillTelephoneFill} from 'react-icons/bs';
import { useNavigate } from "react-router-dom";


function Home(){

    const navigate = useNavigate();


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    
    const [numberOfUsers,setNumberOfusers  ] = useState(0);
    const [numberOfMessages, setNumberOfMessages] = useState(0);


    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
    };

    function handleFormSent ()
    {

        if(name.length <1 || email.length <1 || message.length <1)
        {
            toastifyFile.errorNotify("Please fill all fields")
        }
        else{

            const data = {
                name:name,
                email:email,
                message:message,
            }

            axios
            .post(`http://localhost:8080/messages`,data)
            .then(response=>{
                toastifyFile.successNotify("Successfully sent",5000)
                document.getElementById("name").value=""
                document.getElementById("email").value=""
                document.getElementById("message").value=""
                setName("");
                setEmail("")
                setMessage("");
            })
            .catch(err=>{
                if(err.response === undefined)
                {
                    toastifyFile.errorNotify("There is no response from server")
                }else{
                    if(err.response.data.email !== null)
                    {
                        toastifyFile.errorNotify(err.response.data.email)
                    }
                    if(err.response.data.message !== null)
                    {
                        toastifyFile.errorNotify(err.response.data.message)
                    }
                    else{
                        toastifyFile.errorNotify("Not handling Error")
                    }
                }
            })
        }
    }


    useEffect(()=>{
        axios.get(`http://localhost:8080/dashboard/get-users-messages`)
        .then((res)=>{
            setNumberOfusers(res.data.users);
            setNumberOfMessages(res.data.messages);
        })
        .catch((err)=>{console.log(err);})
    },[])

    return(
        <>
        <ToastContainer  position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <div className="HeroSection">
            <Navbar/>
            <h1 className="HeroSectionH1Tag">Best Barber shop in the world!</h1>
            <div className="HeroSectionDivTag">
            <button onClick={()=>{navigate("/sign-in")}} className="LoginButton">Log in</button>
            <button onClick={()=>{navigate("/sign-up")}} className="SignupButton">Sign Up</button>
            </div>
        </div>
        
        <svg className="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
            <defs>
                <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
            </defs>
            <g className="wave1">
                <use xlinkHref="#wave-path" x="50" y="3" fill="rgba(187, 163, 147, .6)"/>
            </g>
            <g className="wave2">
                <use xlinkHref="#wave-path" x="50" y="0" fill="rgba(187, 159, 142, .6)"/>
            </g>
            <g className="wave3">
                <use xlinkHref="#wave-path" x="50" y="9" fill="#A68C7C"/>
            </g>
        </svg>

        <div className="HomeStatistics">
            <div className="StatisticsBox">
                <div className="StatisticsData">
                    <HiUsers size={40}/>
                    <h1>+ {numberOfUsers}</h1>
                    <h5>Users</h5>
                </div>
            </div>
            <div className="StatisticsBox">
                <div className="StatisticsData">
                    <HiCursorClick size={40}/>
                    <h1>+ {numberOfUsers+numberOfMessages}</h1>
                    <h5>Visitors</h5>
                </div>
            </div>
            <div className="StatisticsBox">
                <div className="StatisticsData">
                    <BiSupport size={40}/>
                    <h1>+ {numberOfMessages}</h1>
                    <h5>Supports</h5>
                </div>
            </div>
        </div>
        <section id="ContactUs">
        <div className="ContactUs">
            <div className="ContactUsFrom">
                <h1>Get in Touch</h1>
                <h6>Contact us here, To help you whaterver you need !</h6>
                <Form>
                    <div className="NameAndEmail">
                        <Form.Floating className="mb-3">
                            <Form.Control
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            style={{ width: '100%' }}
                            onChange={handleChangeName}
                            />
                            <label htmlFor="name" >Name</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3">
                            <Form.Control
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            style={{ width: '100%' }}
                            onChange={handleChangeEmail}
                            />
                            <label htmlFor="floatingInputCustom">Email address</label>
                        </Form.Floating>
                    </div>
                    <FloatingLabel controlId="message" label="Message">
                        <Form.Control
                        as="textarea" 
                        style={{ height: '100px',width: '100%' }}
                        onChange={handleChangeMessage}
                        />
                    </FloatingLabel>
                    <Button className="FromButton" onClick={()=>{handleFormSent()}} variant="primary">Submit</Button>
                </Form>
            </div>
            <div className="BarberTimeInformations">
                <div className="address">
                    <i><MdLocationOn size={30}/></i>
                    <h4>Location:</h4>
                    <a href="https://goo.gl/maps/XAvE4wzgEJc71Zv5A"><p>Riyadh - KSA</p></a>
                </div>
                <div className="email">
                    <i><MdEmail size={30}/></i>
                    <h4>Email:</h4>
                    <p>saadalwuhayb@gmail.com</p>
                </div>
                <div className="phone">
                    <i><BsFillTelephoneFill size={30}/></i>
                    <h4>Phone:</h4>
                    <p>+966 530104030</p>
                </div>
            </div>

        </div>
        </section>
        </>
    )
}

export default Home;