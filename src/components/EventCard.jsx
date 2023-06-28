import { Link } from "react-router-dom";

export default function EventCard({event}) {
    return (
    <>
    <p>{event?.name}</p>
    <Link to="/events/:eventId">{event?.name}</Link>
    </>
    )
}