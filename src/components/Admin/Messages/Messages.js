import { Table,Button } from 'react-bootstrap';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useNavigate } from "react-router";


export default function Messages()
{

    const navigate = useNavigate()

    const state = useSelector((state)=>{
        return{
            token:state.userReducer.token
        }
    })

    const [messages, setMessages] = useState([])

    useEffect(() => {
        const config = {
            headers:{Authorization: `Bearer ${state.token}`}
        }
        axios
        .get("http://localhost:8080/messages",config)
        .then((response) =>
        {
            setMessages(response.data)
        } )
        .catch((error) => console.log(error));
    },[]);
    return(
        <>
        <div className="tableInfo">
            <div className='H1AndButton'>
                <div>
                    <h1>{messages.length} Messages :</h1>
                </div>
            </div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>
                    {messages.map((e)=>{
                        return(
                        <tbody>
                            <tr>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.message}</td>
                            </tr>
                        </tbody>
                    )
                    })}
            </Table>
        </div>
        </>
    )
}
