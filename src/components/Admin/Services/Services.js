import { Table,Button } from 'react-bootstrap';
import './Services.css'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useNavigate } from "react-router";



export default function Services()
{
    const navigate = useNavigate()

    const state = useSelector((state)=>{
        return{
            token:state.userReducer.token
        }
    })

    const [services, setServices] = useState([])

    useEffect(() => {
        const config = {
            headers:{Authorization: `Bearer ${state.token}`}
        }
        axios
        .get("https://deploy-barber-time-project.herokuapp.com/services",config)
        .then((response) =>
        {
            setServices(response.data)
        } )
        .catch((error) => console.log(error));
    },[]);


    return(
        <>
        <div className="tableInfo">
            <div className='H1AndButton'>
                <div>
                    <h1>{services.length} Services :</h1>
                </div>
                <div>
                    <Button className="AddServiceButton" onClick={()=>navigate("create")} variant="primary">Add Service</Button>
                </div>
            </div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                    {services.map((e)=>{
                        return(
                        <tbody>
                            <tr>
                            <td>{e.id}</td>
                            <td>{e.type}</td>
                            <td>{e.description}</td>
                            <td>{e.price}</td>
                            </tr>
                        </tbody>
                    )
                    })}
            </Table>
        </div>
        </>
    )
}
