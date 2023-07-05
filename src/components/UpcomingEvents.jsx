import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './upcomingevents.css'
import { Link } from 'react-router-dom';

export default function UpcomingEvents({ events }) {
  const sortedEvents = events.sort(function (a, b) {
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

  const widestImage = function (event) {
    const images = event.images
    if (!images || !images.length) return undefined
    const widths = images.map(img => img.width)
    const index = widths.indexOf(Math.max(...widths))
    console.log(index, images)
    return images[index].url
  }

  return (
    <>



      <h2 className="text-left text-2xl my-2">Upcoming Events</h2>
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
                <div className="w-full h-80 bg-center bg-cover carousel-bg" style={{ "--bg-img": `url("${widestImage(event)}"` }}>
                  <div className="bg-gradient-to-t from-black via-black via-20% to-transparent to-50% w-full h-full flex flex-row items-end justify-between text-darkDefault">
                    <Link to={"/events/" + event?._id} className="font-black text-xl m-4">{event.name}</Link>
                    <p className=" text-xl m-4">{dateStr}</p>
                  </div>

                </div>
              </div>
            );
          })}
        </Carousel>
      </div>

    </>
  )
}