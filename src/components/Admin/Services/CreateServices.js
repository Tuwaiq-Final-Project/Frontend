import { useState } from "react";

import { ToastContainer } from 'react-toastify';
import { Form,Button,FloatingLabel } from 'react-bootstrap';
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function CreateServices()
{
    const navigate = useNavigate()

    const state = useSelector((state)=>{
        return{
            token:state.userReducer.token
        }
    })

    const [serviceType, setServiceType] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");
    const [servicePrice, setServicePrice] = useState("");


    const handleChangeServiceType = (e) => {
        setServiceType(e.target.value);
    };

    const handleChangeServiceDescription = (e) => {
        setServiceDescription(e.target.value);
    };

    const handleChangeServicePrice = (e) => {
        setServicePrice(e.target.value);
    };

    function formSubmit()
    {
        // check if there all filed are fileds


        // send data to backend via Axios
        const data = {
            type:serviceType,
            description:serviceDescription,
            price:servicePrice
        };
        const config = {
            headers:{Authorization: `Bearer ${state.token}`}
        }
        axios
        .post(`https://deploy-barber-time-project.herokuapp.com/services`,data,config)
        .then((response) =>
        {
            navigate('/services');
        })
        .catch((error) => console.log(error));
    }

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
        <h1>Create new Service </h1>
        <Form>
            <Form.Group className="mb-3" controlId="ServiceTypeInput">
                <Form.Label>Service Type</Form.Label>
                <Form.Control onChange={handleChangeServiceType} type="text" placeholder="Enter Service Type"   /> 
            </Form.Group>
            <FloatingLabel controlId="ServiceDescriptionInput" label="Service Description">
                        <Form.Control
                        as="textarea" 
                        style={{ height: '100px',width: '100%' }}
                        onChange={handleChangeServiceDescription}
                        />
            </FloatingLabel>
            <Form.Group className="mb-3" controlId="ServicePriceInput">
                <Form.Label>Service Price</Form.Label>
                <Form.Control onChange={handleChangeServicePrice} type="number" placeholder="Enter Service Price" />
            </Form.Group>

            <Button onClick={() => (formSubmit())} variant="primary">Submit</Button>
        </Form>
        </div>
        </div>
        </>
    )
        
}