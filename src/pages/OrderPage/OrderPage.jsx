import { useParams, useSearchParams } from "react-router-dom";
import SeatSelector from "../../components/SeatSelector";
import { useEffect, useState } from "react";
import PurchaseSuccess from "../../components/PurchaseSuccess";


export default function OrderPage() {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [unavailableSeats, setUnavailableSeats] = useState(new Set());
  const [boughtReceipt, setBoughtReceipt] = useState(null);
  
  console.log(id);

  const dateTime = event?.dates?.start?.dateTime;
  const eventDateTime = (new Date(dateTime))
  const eventDate = eventDateTime.toLocaleDateString('en-sg', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const eventTime = eventDateTime.toLocaleTimeString('en-sg', { hour: 'numeric', minute: 'numeric' })

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
    <>
      <h1 className="text-2xl m-5">
        You are currently purchasing <b>{event?.name}</b> tickets
      </h1>
      <div className="text-left m-5">
        <u className="font-bold">Event details</u> <div>Date: {eventDate}</div>{" "}
        <div>Time: {eventTime}</div>
      </div>
      <div className="text-left m-5">
      <h2 className="font-bold"><u>Select your seats</u></h2>
      <p><i>Seating plan for {event?._embedded?.venues[0].name}</i></p>
      </div>
      <SeatSelector unavailableSeats={unavailableSeats} eventId={id} setBoughtReceipt={setBoughtReceipt} />
      {boughtReceipt ? <PurchaseSuccess receipt={boughtReceipt}/> : null}
    </>
  );
}
