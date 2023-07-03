import { Link } from "react-router-dom";

export default function EventCard({ event }) {

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "America/Indianapolis",
        timeZoneName: "short"
      };
    const dateISO = event?.dates.start.dateTime;
    const dateObj = dateISO ? new Date(dateISO) : null;
    const dateStr = dateObj ? dateObj.toLocaleString("en-GB",options) : '';
    const timeStr = dateObj ? dateObj.toLocaleTimeString("en-US", { timeZone:"America/Indianapolis", timeZoneName: "short" }) : '';
    console.log(dateStr);
    return (
        <>
            <div className="w-1/3 p-3">
                <img className="w-full h-40 object-cover" src={event?.images[0].url} />
                <p>{dateStr}</p>
                <p>{timeStr}</p>
                <Link to={`/events/${event?._id}`}>{event?.name}</Link>
            </div>
        </>
    );
}
