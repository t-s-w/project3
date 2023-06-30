import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const navigate = useNavigate();

    const { id } = useParams();
    const [event, setEvent] = useState({});
    useEffect(() => {
        async function fetchOneEvent() {
            const response = await fetch(`/api/events/${id}`);
            const jsonData = await response.json();
            setEvent(jsonData);
            console.log(jsonData);
        }
        fetchOneEvent();
        console.log(event);
    }, []);

    const dateISO = event?.dates?.start?.dateTime;
    const dateObj = dateISO ? new Date(dateISO) : null;
    const dateStr = dateObj ? dateObj.toUTCString() : '';
    // console.log(dateObj);

    const handleClick = () => {
        navigate(`/events/${id}/order`);
      };
    

    return (
        <>
            <p>id = {id}</p>

            {event.images && event.images.length > 0 ? (
                <img src={event?.images[0]?.url} />
            ) : (
                <img src="" alt="No image available"/>
            )}
            
            <p>{event?.name}</p>
            <p>{dateStr}</p>
            <p>{event?._embedded?.venues[0].name}</p>
            <button className="rounded-full m-5 bg-blue-500" onClick={handleClick}>Purchase</button>
        </>
    )

}