import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux'
import jwt_decode from "jwt-decode";
import {addUser, addToken} from "../../reducers/user/actions"
import { useNavigate } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastifyFile from "../React-toastify/index"

import { Form,Button } from 'react-bootstrap';
import "./SignIn.css"


function SignIn(){

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
                        navigate("/appointment-reservation");
                    }
                }, 2000);
        })
        .catch((err) => {
            if(err.response === undefined)
                {
                    toastifyFile.errorNotify("There is no response from server")
            }else{
                    toastifyFile.errorNotify("Something Went Wrong")
                }
        });
    };

    return(
        <>
        <div className="SignInPage">
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
        <h1>Login</h1>
        <Form>
            <Form.Group className="mb-3" controlId="SingInFormBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleChangeEmail} type="email" placeholder="Enter email" />
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
        </div>
        </>
    )
}

export default SignIn;
