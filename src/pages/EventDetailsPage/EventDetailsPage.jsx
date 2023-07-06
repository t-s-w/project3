import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoreInfoEvent from "../../components/MoreInfoEvent";
import Favourites from "../../components/AddToFavourite";

export default function EventDetailsPage() {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const navigate = useNavigate();


    const [popoutVisible, setPopoutVisible] = useState(false);

    useEffect(() => {
      async function fetchOneEvent() {
        const response = await fetch(`/api/events/${id}`);
        const jsonData = await response.json();
        setEvent(jsonData);
        console.log("event", jsonData);
      }
      fetchOneEvent();
      console.log("event", event);
    }, []);

    const dateISO = event?.dates?.start?.dateTime;
    const dateObj = dateISO ? new Date(dateISO) : null;
    const dateStr = dateObj ? dateObj.toUTCString() : "";
    // console.log(dateObj);

    const handleClick = () => {
      navigate(`/events/${id}/order`);
    };

    return (
      <>
        {event.images && event.images.length > 0 ? (
          <img className="mt-2" src={event?.images[0]?.url} />
        ) : (
          <img src="" alt="No image available" />
        )}
        <Favourites event={event} />
        <p>{event?.name}</p>
        <p>{dateStr}</p>
        <p>
          {event?._embedded?.venues[0].name},{" "}
          {event?._embedded?.venues[0].city.name},{" "}
          {event?._embedded?.venues[0].state.name}
        </p>

        <button onClick={() => setPopoutVisible(true)}>More info</button>

        <MoreInfoEvent
          event={event}
          trigger={popoutVisible}
          setTrigger={setPopoutVisible}
        />

        <button className="rounded-full m-5 bg-blue-500" onClick={handleClick}>
          Purchase
        </button>
      </>
    );

}