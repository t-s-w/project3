import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Popout from 'react-popout';
import MoreInfoEvent from "../../components/MoreInfoEvent";

export default function EventDetailsPage() {

    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [popoutVisible, setPopoutVisible] = useState(false);

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
            <p>{event?._embedded?.venues[0].name}, {event?._embedded?.venues[0].city.name}, {event?._embedded?.venues[0].state.name}</p>
            
            <button onClick={() => setPopoutVisible(true)}>More info</button>
            
            <MoreInfoEvent trigger={popoutVisible} setTrigger={setPopoutVisible}>
                <div>Pop out content</div>
            </MoreInfoEvent>
            <button className="rounded-full m-5 bg-blue-500" >Purchase</button>
        </>
    )
}