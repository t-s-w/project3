import { Link } from "react-router-dom";

export default function EventCard({ event }) {
    return (
        <>
            <div className="w-1/3 p-3">
                <img className="w-full h-40 object-cover" src={event?.images[0].url} />
                <Link to={`/events/${event?._id}`}>{event?.name}</Link>
            </div>
        </>
    );
}
