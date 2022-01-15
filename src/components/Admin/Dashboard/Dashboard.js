import { Link } from "react-router-dom"
import axios from "axios";
import React, { useEffect, useState } from 'react';
import './Dashboard.css'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';



export default function Dashboard()
{

    


    const [users , setUsers] = useState(0); 
    const [admins , setAdmins] = useState(0); 
    const [services , setServices] = useState(0); 
    const [reservations , setReservations] = useState(0); 
    const [messages , setMessages] = useState(0); 

    
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ['ADMINS', 'USERS'],
        datasets: [
        {
            label: '# of Votes',
            data: [admins, users],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 3,
        },
        ],
    };

    const data2 = {
        labels: ['Services', 'Reservations'],
        datasets: [
        {
            label: '# of Votes',
            data: [services, reservations],
            backgroundColor: [
                'rgba(99, 160, 99,0.2)',
                'rgba(146, 146, 146, 0.2)',
            ],
            borderColor: [
                'rgba(99, 160, 99, 1)',
                'rgba(146, 146, 146, 1)',
            ],
            borderWidth: 3,
        },
        ],
    };

    const data3 = {
        labels: ['Services', 'Reservations'],
        datasets: [
        {
            label: '# of Votes',
            data: [users, messages],
            backgroundColor: [
                'rgba(255, 206, 86,0.2)',
                'rgba(146, 146, 146, 0.2)',
            ],
            borderColor: [
                'rgba(255, 206, 86, 1)',
                'rgba(146, 146, 146, 1)',
            ],
            borderWidth: 3,
        },
        ],
    };


    useEffect(() => {
        
        axios.get('http://localhost:8080/dashboard/all')
        .then(
            function(res)
            {
                setAdmins(res.data.admins)
                setUsers(res.data.users)
                setServices(res.data.services)
                setReservations(res.data.reservations)
                setMessages(res.data.messages)
            }
            )
        .catch(function(err){console.log(err)})
    },[]);

    return(
        <>
        
        {/* هنا احط charts */}
                <div className="GridData">
                    <div>
                        <Pie data={data} />
                        <h5>{users}Users - {admins}Admins</h5>
                    </div>
                    <div>
                        <Pie data={data2} />
                        <h5>{services}Services - {reservations}Reservations</h5>
                    </div>
                    <div>
                        <Pie data={data3} />
                        <h5>{users}Users - {messages}Messages</h5>
                    </div>
                    {/* <div className="Users">Users: {user}</div> */}
                    {/* <div className="services">services: {services}</div> */}
                    {/* <div className="reservations">reservations: {reservations}</div> */}
                    {/* <div className="messages">messages: {messages}</div> */}
                </div>
        </>
    )
}
