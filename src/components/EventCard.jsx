import { Link } from "react-router-dom";
import "./eventcard.css"

export default function EventCard({event}) {
    return (
    <>
    <div className="event-container">
        <div className="event-card-item">
        <img src={event?.images[0].url} width={300} />
        <Link to={`/events/${event?.id}`}>{event?.name}</Link>
        </div>
    </div>
    </>
    )
}