import { Link } from "react-router-dom";

export default function EventCard({ event }) {

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const dateISO = event?.dates.start.dateTime;
    const dateObj = dateISO ? new Date(dateISO) : null;
    const dateStr = dateObj ? dateObj.toLocaleString("en-GB", options) : '';
    const timeStr = dateObj ? dateObj.toLocaleTimeString("en-US", { timeZone: event?._embedded?.venues[0]?.timezone, timeZoneName: "short", hour: "numeric", minute: "numeric" }) : '';

    return (
      <>
        <div className="w-1/3 p-3">
          <img
            className="w-full h-40 object-cover"
            src={event?.images[0].url}
          />
          <Link to={`/events/${event?._id}`} className="font-bold">
            {event?.name}
          </Link>
          <p>
            {event?._embedded.venues[0]?.city?.name},{" "}
            {event?._embedded.venues[0]?.state?.name}
          </p>
          <p>
          {event?.dates?.start?.dateTime ? (<p>{dateStr} {timeStr}</p>):(<p>Date & time to be announced</p>)}
          </p>
        
        </div>
      </>
    );
}
