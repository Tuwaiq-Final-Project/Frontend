import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux'
import jwt_decode from "jwt-decode";
import {addUser, addToken} from "../../reducers/user/actions"
import { useNavigate, useLocation } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastifyFile from "../React-toastify/index"

import { Form,Button } from 'react-bootstrap';
import "./SignIn.css"


function SignIn(){

    const {state} = useLocation();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    function signInRequest()
    {
        const data = {
            email,
            password,
        };
        
        axios
        .post("http://localhost:8080/login", data)
        .then((res) => {
            const token = res.data.access_token
            let decodedHeader = jwt_decode(token);
            // console.log(decodedHeader);
            // add to redux & localstorage
            dispatch(addUser({"id":decodedHeader.userInfo.id ,"name":decodedHeader.userInfo.name,"role":decodedHeader.roles[0]}));
            dispatch(addToken(token));

            toastifyFile.successNotify("Seccessfuly Logedin")
                setTimeout(() => {

                    if(decodedHeader.roles[0] ==="ADMIN")
                    {
                        navigate("/dashboard");
                    }
                    else{
                        navigate("/");
                    }
                }, 2000);
        })
        .catch((err) => {
            toastifyFile.errorNotify("Something Went Wrong")
            console.log(err);
        });
    };
    

    useEffect(() => {
        
        if(state != null)
        {
            setEmail(state.email)
        }

    },[]);

    return(
        <>
        <h1>SignIn</h1>
        <div className="SignInForm">
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
        <Form>
            <Form.Group className="mb-3" controlId="SingInFormBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleChangeEmail} type="email" placeholder="Enter email" value={email}  />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="SingInFormBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control  onChange={handleChangePassword} type="password" placeholder="Password" />
            </Form.Group>

            <Button onClick={()=>(signInRequest())} variant="primary">Submit</Button>
        </Form>
        </div>
        </>
    )
}

export default SignIn;
