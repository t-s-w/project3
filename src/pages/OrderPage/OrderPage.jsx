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

  useEffect(() => {
    async function fetchPurchasingEvent() {
      const response = await fetch(`/api/events/${id}`);
      const jsonData = await response.json();
      setEvent(jsonData);
      const takenSeats = await fetch(`/api/events/${id}/takenSeats`).then(x => x.json());
      setUnavailableSeats(new Set(takenSeats))
    }
    fetchPurchasingEvent();
  }, []);

  return (
    <>
      <h1>
        Purchase your <b>{event?.name}</b> tickets
      </h1>
      <p>Date: {event?.dates?.start?.dateTime}</p>
      <p>Seating plan for {event?._embedded?.venues[0].name}</p>
      <SeatSelector unavailableSeats={unavailableSeats} eventId={id} setBoughtReceipt={setBoughtReceipt} />
      {boughtReceipt ? <PurchaseSuccess receipt={boughtReceipt}/> : null}
    </>
  );
}
