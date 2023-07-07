import { useParams, useSearchParams } from "react-router-dom";
import SeatSelector from "../../components/SeatSelector";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App/App";
import NotLoggedIn from "../../components/NotLoggedIn";


export default function OrderPage() {
  const { user } = useContext(UserContext);
  if (!user) { return <NotLoggedIn /> }
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [unavailableSeats, setUnavailableSeats] = useState(new Set());

  console.log(id);

  const dateTime = event?.dates?.start?.dateTime;
  const eventDateTime = (new Date(dateTime))
  const eventDate = dateTime ? eventDateTime.toLocaleDateString('en-sg', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "No specific date"
  const eventTime = dateTime ? eventDateTime.toLocaleTimeString('en-sg', { hour: 'numeric', minute: 'numeric' }) : null

  useEffect(() => {
    async function fetchPurchasingEvent() {
      const response = await fetch(`/api/events/${id}`);
      const jsonData = await response.json();
      setEvent(jsonData);
      const takenSeats = await fetch(`/api/events/${id}/takenSeats`).then((x) =>
        x.json()
      );
      setUnavailableSeats(new Set(takenSeats));
    }
    fetchPurchasingEvent();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl mt-5">
        You are currently purchasing <b>{event?.name}</b> tickets
      </h1>
      <div className="text-left my-2">
        <u className="font-bold">Event details</u> <div>Date: {eventDate}</div>{" "}
        {eventTime ? <div>Time: {eventTime}</div> : null}
      </div>
      <div className="text-left my-2">
        <h2 className="font-bold"><u>Select your seats</u></h2>
        <p><i>Seating plan for {event?._embedded?.venues[0].name}</i></p>
      </div>
      <SeatSelector unavailableSeats={unavailableSeats} eventId={id} config1={event.seatConfig?.seats} prices={event.seatConfig?.prices} />

    </div>
  );
}
