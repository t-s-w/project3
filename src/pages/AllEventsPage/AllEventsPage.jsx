import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";
import UpcomingEvents from "../../components/UpcomingEvents";

export default function AllEventsPage() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchAllEvents() {
            const response = await fetch("/api/events");
            const jsonData = await response.json();
            setEvents(jsonData);

        }
        fetchAllEvents();
        console.log(events);
    }, []);



    return (
        <>
            <UpcomingEvents events={events}/>
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