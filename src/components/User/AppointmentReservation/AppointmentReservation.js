import './AppointmentReservation.css'
import { Form,Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function AppointmentReservation()
{
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const [services , setServices] = useState([]);
    const [selectedTime , setSelectedTime] = useState("");
    const [next7dayuseState , setNext7dayuseState] = useState([]);
    const [selectedService , setSelectedService] = useState("");
    const [havePendingOrder , sethavePendingOrder] = useState(false);

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
        .get(`http://localhost:8080/reservations/checkIfTherePendingReservations/${state.userId}`,config)
        .then( (res)=>{
            if(res.data.message)
            {
                sethavePendingOrder(true)
            }
        })
        .catch((error)=>console.log(error))


        axios
        .get(`http://localhost:8080/services`,config)
        .then( (res)=>{
            setServices(res.data);
            setSelectedService(res.data[0].id);
        })
        .catch((error)=>console.log(error))


        // ---------------------------------
        // Calculate next 7 days
        let day = new Date();    
        let nextDay = new Date(day);

        let next7day =[]
        weekday.map((ele,index)=>{
            
            let month = String(nextDay.getUTCMonth() + 1);
            let day = String(nextDay.getUTCDate());
            let year = nextDay.getUTCFullYear();
            // console.log("month " + month);
            // console.log("Befor day " + day);
            if(day.length === 1)
            {
                day = "0" + day;
            }
            if(month.length === 1)
            {
                month = "0" + month;
            }
            // console.log("After day " + day);
            // console.log("After month " + month);

            let newdate = year + "-" + month + "-" + day;
            next7day.push({dayName:weekday[nextDay.getDay()],date:newdate})
            nextDay.setDate(nextDay.getDate() + 1);
        })
        setNext7dayuseState(next7day)
    },[])

    function formSubmitted(selectedDate)
    {
        // console.log("!!!!!!!!!!!!");
        // console.log(selectedService)
        // console.log(selectedTime)
        // console.log(selectedDate)
        // console.log(state.userId)
        // console.log(state.token)
        // console.log("!!!!!!!!!!!!");

        const config = {
            headers : {Authorization : `Bearer ${state.token}`}
        }
        const AppointmentData = {
            date:selectedDate,
            time:selectedTime,
            status:"Pending",
            user:{id:state.userId},
            service:{id:selectedService}
        }

        console.log(AppointmentData);
        axios
        .post(`http://localhost:8080/reservations`,AppointmentData,config)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>console.log(error))
    }
    
    

    return( 
        <>
            { havePendingOrder == true ? <> <h4 style={{textAlign:"center"}}>You have at  <a href={"my-reservations"}>My Reservations</a> a Pending order</h4> </> 
            : 
            <>
            <div className="AppointmentReservationSelect">
            <h5>Select Service</h5>
            <Form.Select aria-label="Default select example" onChange={(e)=>{setSelectedService(e.target.value)}}>
                {services.map((ele,index)=>{
                    return(
                        <option key={index} value={ele.id}>{ele.type} : {ele.price}SR</option>
                    )
                })}
            </Form.Select>
        </div>
        <div className="SelectdayAndTime">
            {next7dayuseState.map((ele,index)=>{
                return <>
                <div key={index} className="Card">
                    <h4>{ele.dayName}</h4>
                    <h5>{ele.date}</h5>
                    <div className='SelectdayAndTimeForm'>
                        <h6>Choose the Time :</h6>
                        <Form.Select className='TimeForm' aria-label="Default select example" onChange={(e)=>{setSelectedTime(e.target.value)}}>
                            <option value="13:00">1 P.M</option>
                            <option value="14:00">2 P.M</option>
                            <option value="15:00">3 P.M</option>
                            <option value="16:00">4 P.M</option>
                            <option value="17:00">5 P.M</option>
                            <option value="18:00">6 P.M</option>
                            <option value="19:00">7 P.M</option>
                            <option value="20:00">8 P.M</option>
                            <option value="21:00">9 P.M</option>
                            <option value="22:00">10 P.M</option>
                        </Form.Select>
                        <hr/>
                    </div>
                    <Button onClick={ ()=>{formSubmitted(ele.date)}} className="SelectdayAndTimeButton"variant="primary">Submit</Button>
                </div>
                </>
            })}
        </div>
            </>} 
        </>
    )
}
