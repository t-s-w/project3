import { Link } from "react-router-dom";

export default function EventCard({event}) {
    return (
    <>
    
    <Link to="/events/:eventId">{event?.name}</Link>
    </>
    )
}