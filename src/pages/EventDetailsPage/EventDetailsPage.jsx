import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function EventDetailsPage(){

    const {id} = useParams();
    const [event, setEvent] = useState([]);
    useEffect(() => {
        async function fetchOneEvent() {
            const response = await fetch(`http://localhost:3001/api/events/${id}`);
            const jsonData = await response.json();
            setEvent(jsonData);
            console.log(jsonData);
          }
        fetchOneEvent();    
        console.log(event);
        }, []);
    
    
    return (
    <>
    <p>{id}</p>
    <p>{event.name}</p>
    <button className="rounded-full m-5 bg-blue-500" >Purchase</button>
    </>
    )
}