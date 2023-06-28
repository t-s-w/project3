import { Link } from "react-router-dom";

export default function EventCard({event}) {
    return (
    <>
    <img 
    src={event?.images[0].url}
    width={200}
    
    />
    <Link to="/events/:eventId">{event?.name}</Link>

    </>
    )
}