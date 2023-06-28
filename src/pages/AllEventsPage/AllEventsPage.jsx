import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";

export default function AllEventsPage() {

    const [events, setEvent] = useState({});

    useEffect(() => {
        async function fetchAllEvents() {
            const response = await fetch("/api/events/Z7r9jZ1Ad_exe");
            const jsonData = await response.json();
            setEvent(jsonData);

        }
        fetchAllEvents();
        console.log(events);
    }, []);


    return (
        <>
            {/* <p>{JSON.stringify(events)}</p> */}
            <p><EventCard event={events} /></p>

        </>
    )
}