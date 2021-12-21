import { useState } from "react";
import { useNavigate } from "react-router"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastifyFile from "../React-toastify/index"

import { Form,Button } from 'react-bootstrap';
import "./SignUp.css"


function SignUp(){

    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [requiredField, setRequiredField] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    function checkAllFiledNotEmpty (){
        if(name.length>0 && email.length>0 && password.length>0 && confirmPassword.length>0 && phone.length>0)
        {
            console.log("All fields are filled")
            return true 
            }
            else
            {
                if(name.length<1)
                {
                setRequiredField("This Field is Requierd")
                }
                if(email.length<1)
                {
                setRequiredField("This Field is Requierd")
                }
                if(phone.length<1)
                {
                setRequiredField("This Field is Requierd")
                }
                if(password.length<1)
                {
                setPasswordErrorMsg("This Field is Requierd")
                }
                if(confirmPassword.length<1)
                {
                setPasswordErrorMsg("This Field is Requierd")
                }
                return false
            }
        }

    function signUpRequerst()
    {
        // check if all filed are filed 
        if(!checkAllFiledNotEmpty())
        {
            toastifyFile.errorNotify("Please fill all fields")
            console.log("There some fields are not filled")
            return;
        }
        // check first if the password == confirm password 
        if(password !== confirmPassword)
        {
            toastifyFile.errorNotify("Passwords Doesn't Match")
            setPasswordErrorMsg("Doesn't Match")
            document.getElementById("formBasicPassword").value=""
            document.getElementById("formBasicConfirmPassword").value=""
            return;
        }

            const data = {
                user:{
                    name:name,
                    email:email,
                    phone:phone,
                    password:password
                },
                role_id:1  // 1 = should be USER
            }
            axios
            .post(`http://localhost:8080/users`,data)
            .then(response=>{
                toastifyFile.successNotify(response.data.success)
                setTimeout(() => {
                    navigate('/sign-in', {state:{email:email}});
                }, 2000);
            })
            .catch(err=>{
                console.log(err.response.data);
                if(err.response.data.email !== null)
                {
                    toastifyFile.errorNotify(err.response.data.email)
                }
                if(err.response.data.phone !== null)
                {
                    toastifyFile.errorNotify(err.response.data.phone)
                }
                if(err.response.data.error !== null)
                {
                    toastifyFile.errorNotify(err.response.data.error)
                }
                else{
                    toastifyFile.errorNotify("Not handling Error")
                }
            })
    }

    return(
        <>
        <h1>SignUp</h1>
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
        <div className="SignUpForm">
        <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={handleChangeName} type="text" placeholder={requiredField} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleChangeEmail} type="email" placeholder={requiredField} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control onChange={handleChangePhone} type="text" placeholder={requiredField} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handlePassword} type="password" placeholder={passwordErrorMsg} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control onChange={handleConfirmPassword}  type="password" placeholder={passwordErrorMsg} />
            </Form.Group>

            <Button onClick={()=>{signUpRequerst()}} variant="primary">Submit</Button>
        </Form>
        </div>
        </>
    )
}

export default SignUp;
