import { Link } from "react-router-dom";
import "./favourites.css";

export default function FavouritesCard({ fav }) {
  const event = fav;
  const eventDateTime = new Date(event.dates.start.dateTime);
  const eventDate = event.dates.start.dateTime
    ? eventDateTime.toLocaleDateString("en-sg", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No specific date";
  const eventTime = event.dates.start.dateTime
    ? eventDateTime.toLocaleTimeString("en-sg", {
        hour: "numeric",
        minute: "numeric",
        timeZone: event.dates.timezone,
      })
    : null;

  const saleStartDateTime = new Date(fav.sales.public.startDateTime);
  const saleStartDate = fav.sales.public.startDateTime
    ? saleStartDateTime.toLocaleDateString("en-sg", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const saleStartTime = fav.sales.public.startDateTime
    ? saleStartDateTime.toLocaleTimeString("en-sg", {
        hour: "numeric",
        minute: "numeric",
        timeZone: event.dates.timezone,
      })
    : null;

  const saleEndDateTime = new Date(fav.sales.public.endDateTime);
  const saleEndDate = fav.sales.public.endDateTime
    ? saleEndDateTime.toLocaleDateString("en-sg", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const saleEndTime = fav.sales.public.endDateTime
    ? saleStartDateTime.toLocaleTimeString("en-sg", {
        hour: "numeric",
        minute: "numeric",
        timeZone: event.dates.timezone,
      })
    : null;

  return (
    <tr className="cell">
      <td>
        <img
          className="image w-full h-20 object-cover"
          src={fav?.images[0].url}
          alt="Event"
        />
      </td>
      <td>
        <h3 className="title">
          <Link to={`/events/${fav?._id}`} className="font-bold">
            {fav?.name}
          </Link>
          <div>
            {eventDate} <br /> {eventTime}
          </div>
        </h3>
        <p className="location">
          {fav?._embedded.venues[0]?.city?.name}
          {fav?._embedded.venues[0]?.state
            ? `, ${fav?._embedded.venues[0]?.state?.name}`
            : null}
        </p>
      </td>
      <td>
        <div className="sales-period">
          <p>Sales period:</p>
          {saleStartDate && saleEndDate ? (
            <p>
              {saleStartDate}
              {saleStartTime} <br></br> to <br></br>
              {saleEndDate}
              {saleEndTime}a
            </p>
          ) : (
            <p>More details to be announced</p>
          )}
          <div>
            <Link to={fav?.url} className="text-blue-800">
              Purchase now on ticketing site
            </Link>
          </div>
        </div>
      </td>
    </tr>
  );
}
