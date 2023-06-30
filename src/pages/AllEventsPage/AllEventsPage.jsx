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
        <h1 className="text-left text-2xl">Top events</h1>
        <div className="flex flex-wrap">
          {events ? (
            events.map((event) => <EventCard event={event} key={event._id} />)
          ) : (
            <p>No events available</p>
          )}
        </div>
      </>
    );
}