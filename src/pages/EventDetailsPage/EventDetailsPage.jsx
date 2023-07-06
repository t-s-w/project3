import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoreInfoEvent from "../../components/MoreInfoEvent";
import Favourites from "../../components/AddToFavourite";
import sendRequest from "../../utilities/send-request";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState({});

  const [popoutVisible, setPopoutVisible] = useState(false);

  async function getFavourites() {
    const response = await sendRequest(`/api/userDetails/getOneUser`);
    setFavourites(response.favourites);
    console.log(response.favourites);
  }
  async function fetchOneEvent() {
    const response = await fetch(`/api/events/${id}`);
    const jsonData = await response.json();
    setEvent(jsonData);
    console.log("event", jsonData);
  }

  useEffect(() => {
    fetchOneEvent();
    getFavourites();
    console.log("event", event);
  }, []);

  const dateISO = event?.dates?.start?.dateTime;
  const dateObj = dateISO ? new Date(dateISO) : null;
  const dateStr = dateObj ? dateObj.toUTCString() : "";
  // console.log(dateObj);

  console.log("fav", favourites);
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
      <Favourites
        setFavourites={setFavourites}
        favourites={favourites}
        event={event}
      />
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