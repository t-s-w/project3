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

  const widestImage = function (event) {
    const images = event.images
    if (!images || !images.length) return undefined
    const widths = images.map(img => img.width)
    const index = widths.indexOf(Math.max(...widths))
    console.log("index", index, images)
    return images[index].url
  }


  return (
    <div className="flex flex-col mt-10 mb-auto">
      <h2 className="text-left text-2xl my-2 text-left text-1xl my-2 mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Event Details</h2>
      <div className="flex flex-row flex-nowrap gap-y-4">
        <div className="basis-1/2">
          {event.images && event.images.length > 0 ? (
            <div className="w-full h-80 bg-center bg-cover carousel-bg" style={{ "--bg-img": `url("${widestImage(event)}"` }}></div>
          ) : (
            <img src="" alt="No image available" />
          )}
        </div>
        <Favourites
          setFavourites={setFavourites}
          favourites={favourites}
          event={event}
        />
        <div className="place-self-center ml-4">
          <p className="text-2xl font-medium text-gray-900 dark:text-white underline decoration-blue-500">{event?.name}</p>
          {event?.dates?.start?.dateTime ? (<p>{dateStr}</p>) : (<p>Date & time to be announced</p>)}

          <p>
            {event?._embedded?.venues[0].name},{" "}
            {event?._embedded?.venues[0].city.name},{" "}
            {event?._embedded?.venues[0]?.state?.name}
          </p>

          <button className="rounded-full" onClick={() => setPopoutVisible(true)}>More info</button>
          <button className="rounded-full m-5 bg-blue-500" onClick={handleClick}>
            Purchase
          </button>
        </div>
      </div>
      <MoreInfoEvent
        event={event}
        trigger={popoutVisible}
        setTrigger={setPopoutVisible}
      />
    </div>
  );
}