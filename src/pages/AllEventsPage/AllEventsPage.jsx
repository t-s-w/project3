import { useEffect, useState } from "react";

export default function AllEventsPage(){
    
    const [events, setEvent] = useState({});

    useEffect(() => {
        async function fetchAllEvents() {
            const response = await fetch("http://localhost:3001/api/events/Z7r9jZ1Ad_exe");
            const jsonData = await response.json();
            setEvent(jsonData);
            
          }
        fetchAllEvents();    
        }, []);
    
    
    return (
    <>
    <p>{JSON.stringify(events)}</p>
    </>
    )
}