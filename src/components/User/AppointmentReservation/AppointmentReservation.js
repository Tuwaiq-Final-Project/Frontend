import './AppointmentReservation.css'
import { Form,Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toastifyFile from "../../React-toastify/index"
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';


export default function AppointmentReservation()
{
    const navigate = useNavigate();
    
    const [services , setServices] = useState([]);
    const [availableDaysTimes , setAvailableDaysTimes] = useState([]);
    const [selectedService , setSelectedService] = useState("");
    const [havePendingOrder , sethavePendingOrder] = useState(false);
    const [selectedTime , setSelectedTime] = useState([null,null,null,null,null,null,null]);


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
            else{
                // Get All Services
                axios
                .get(`http://localhost:8080/services`,config)
                .then( (res)=>{
                    setServices(res.data);
                    setSelectedService(res.data[0].id);
                })
                .catch((error)=>console.log(error))

                // Get All Available-days-times
                axios
                .get(`http://localhost:8080/reservations/available-days-times`,config)
                .then( (res)=>{
                    setAvailableDaysTimes(res.data)
                    // set initial values
                    let copyOfselectedTime = [...selectedTime]
                    copyOfselectedTime[0]=res.data[0].times[0];
                    copyOfselectedTime[1]=res.data[1].times[0];
                    copyOfselectedTime[2]=res.data[2].times[0];
                    copyOfselectedTime[3]=res.data[3].times[0];
                    copyOfselectedTime[4]=res.data[4].times[0];
                    copyOfselectedTime[5]=res.data[5].times[0];
                    copyOfselectedTime[6]=res.data[6].times[0];
                    setSelectedTime(copyOfselectedTime)
                })
                .catch((error)=>console.log(error))
            }
        })
        .catch((error)=>console.log(error))
    },[])


    function formSubmitted(selectedDate,index)
    {
    const config = {
        headers : {Authorization : `Bearer ${state.token}`}
    }
    const AppointmentData = {
        date:selectedDate,
        time:selectedTime[index],
        status:"Pending",
        user:{id:state.userId},
        service:{id:selectedService}
    }
    axios
    .post(`http://localhost:8080/reservations`,AppointmentData,config)
    .then((res)=>{
        toastifyFile.successNotify("Request Has Been Sent")
        setTimeout(() => {
            navigate("/my-reservations");
        }, 2000);
    })
    .catch((error)=>console.log(error))
    }

    // https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no
    function tConvert (time) {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
    }
    
    
    return(
        <>
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
            {availableDaysTimes.map((ele,index)=>{
                return <>
                <div key={index} className="Card">
                    <h4>{ele.dayShow}</h4>
                    <h5>{ele.dayDate}</h5>
                    <div className='SelectdayAndTimeForm'>
                        <h6>Choose the Time :</h6>
                        <Form.Select className='TimeForm' aria-label="Default select example" 
                        onChange={(e)=>{ 
                                    let copyOfselectedTime = [...selectedTime]
                                    copyOfselectedTime[index]=e.target.value
                                    setSelectedTime(copyOfselectedTime)
                                    }
                                }
                        >
                            {ele.times.map((ele2) =>{
                                return <option value={ele2}>{tConvert(ele2)}</option>
                            })}
                        </Form.Select>
                        <hr/>
                    </div>
                    <Button onClick={ ()=>{formSubmitted(ele.dayDate,index)}} className="SelectdayAndTimeButton"variant="primary">Submit</Button>
                </div>               
            </>
            })}
        </div>
            </>} 
        </>
    )
}
