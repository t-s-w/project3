import { useParams, useSearchParams } from "react-router-dom";
import SeatSelect from "../SeatSelect/SeatSelect";
import { useEffect, useState } from "react";

export default function OrderPage() {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  console.log(id);

  useEffect(() => {
    async function fetchPurchasingEvent() {
      const response = await fetch(`http://localhost:3001/api/events/${id}`);
      const jsonData = await response.json();
      setEvent(jsonData);
      console.log(jsonData);
    }
    fetchPurchasingEvent();
    console.log(event);
  }, []);

  return (
    <>
      <h1>
        Purchase your <b>{event?.name}</b> tickets
      </h1>
      <p>Date: {event?.dates?.start?.dateTime}</p>
      <p>Seating plan for {event?._embedded?.venues[0].name}</p>
      <SeatSelect />
    </>
  );
}
