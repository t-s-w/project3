import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function UpcomingEvents ({events}) {
    const sortedEvents = events.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        const dateObjA = new Date(a.dates?.start?.dateTime);
        // console.log("A", dateObjA)
        const dateObjB = new Date(b.dates?.start?.dateTime);
        // console.log("B", dateObjB)
        return dateObjA - dateObjB;
      });
      console.log(sortedEvents);

      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",       
      };
    ;

    return (
    <>
    
    
    
    <h2>Upcoming Events</h2>
    <div className="">
    <Carousel showThumbs={false} showStatus={true} showIndicators={false}>
        {sortedEvents.slice(0, 5).map((event, i) => {
          const dateISO = event?.dates?.start?.dateTime;
          const dateObj = dateISO ? new Date(dateISO) : null;
          const dateStr = dateObj ? dateObj.toLocaleString('en-GB', options) : '';
          const timeStr = dateObj
            ? dateObj.toLocaleTimeString('en-US', {
                timeZone: event?._embedded?.venues[0]?.timezone,
                timeZoneName: 'long',
              })
            : '';

          return (
            <div key={event.id} className="carousel-item">
              <img className="w-80 h-48 object-cover" src={event?.images[0].url} alt={event.name} />
              <p>{event.name}</p>
              <p>{dateStr}</p>
              <p>{timeStr}</p>
            </div>
          );
        })}
      </Carousel>
      </div>
    
    </>
    )
}