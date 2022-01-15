import { Table,Button } from 'react-bootstrap';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';


export default function Reservations()
{

    const state = useSelector((state)=>{
        return{
            token:state.userReducer.token
        }
    })

    const [reservations, setReservations] = useState([])



    function changeReservationState(reservationId,isApproved){
        let data = JSON.stringify({
            status: isApproved == true ? "Approved" :"Rejected",
        })
        axios.post(`http://localhost:8080/reservations/change-status/${reservationId}`, data, {
            headers: {'Content-Type': 'application/json',}
        }
        )
        .then((res)=>{
            const config = {
                headers:{Authorization: `Bearer ${state.token}`}
            }
            axios
            .get("http://localhost:8080/reservations",config)
            .then((response) =>
            {
                setReservations(response.data)
            } )
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error))
    }



    useEffect(() => {
        const config = {
            headers:{Authorization: `Bearer ${state.token}`}
        }
        axios
        .get("http://localhost:8080/reservations",config)
        .then((response) =>
        {
            setReservations(response.data)
        } )
        .catch((error) => console.log(error));
    },[]);


    return(
        <>
        <div className="tableInfo">
            <div className='H1AndButton'>
                <div>
                    <h1>{reservations.length} Reservations :</h1>
                </div>
            </div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Service Type</th>
                        <th>User</th>
                        <th>status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                    {reservations.map((e,ind)=>{
                        return(
                        <tbody>
                            <tr index={ind}>
                            <td>{e.id}</td>
                            <td>{e.date}</td>
                            <td>{e.time}</td>
                            <td>{e.service.type}</td>
                            <td>{e.user.name}</td>
                            <td>{e.status}</td>
                            <td>
                                { e.status !== "Pending" ? "" : 
                                <> 
                                <Button onClick={() => {changeReservationState(e.id,true)}} variant="success">Approve</Button> 
                                <Button onClick={() => {changeReservationState(e.id,false)}} variant="danger">Reject</Button>
                                </>
                                }
                            </td>
                            </tr>
                        </tbody>
                    )
                    })}
            </Table>
        </div>
        </>
    )
}
