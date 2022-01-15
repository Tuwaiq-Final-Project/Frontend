import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';


export default function MyReservations()
{

    const [myReservations, setMyReservations] = useState([])

    const state = useSelector((state)=>{
        return{
            userId:state.userReducer.user.id,
            token:state.userReducer.token,
        }
    })

    useEffect(()=>{
        const config = {
            headers : {Authorization : `Bearer ${state.token}`}
        }
        axios
        .get(`http://localhost:8080/reservations/my-reservations/${state.userId}`,config)
        .then( (res)=>{
            console.log("!!!!!!!!!!");
            console.log(res);
            setMyReservations(res.data)
            console.log("!!!!!!!!!!");
        })
        .catch((error)=>console.log(error))

    },[])

    return(
        <>
<div className="tableInfo">
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Service Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                    {myReservations.map((e)=>{
                        return(
                            <tbody>
                                <tr>
                                <td>{e.id}</td>
                                <td>{e.date}</td>
                                <td>{e.time}</td>
                                <td>{e.service.type}</td>
                                <td>{e.status}</td>
                                </tr>
                            </tbody>
                            )
                    })}
            </Table>
        </div>
        </>
    )
}
