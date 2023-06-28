import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";

export default function AllEventsPage(){
    
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchAllEvents() {
            const response = await fetch("http://localhost:3001/api/events");
            const jsonData = await response.json();
            setEvents(jsonData);
            
          }
        fetchAllEvents();    
        console.log(events);
        }, []);
    
    
    return (
    <>
    {events ? (
        events.map((event) => <p><EventCard event={event}/></p>)
        ) : (
        <p>No events available</p>
    )}
    
    
    </>
    )
}