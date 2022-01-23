import { Table } from 'react-bootstrap';
import './Users.css'
import axios from 'axios';
import { useState,useEffect } from 'react';


export default function Users()
{
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios
        .get("https://deploy-barber-time-project.herokuapp.com/users")
        .then((response) =>
        {
            setUsers(response.data)
        } )
        .catch((error) => console.log(error));
    },[]);

    return(
        <>  
        <div className="tableInfo">
            <h1>{users.length} Users :</h1>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                    {users.map((e)=>{
                        return(
                            <tbody>
                                <tr>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.roles[0].name}</td>
                                </tr>
                            </tbody>
                            )
                    })}
            </Table>
        </div>
        </>
    )
}
