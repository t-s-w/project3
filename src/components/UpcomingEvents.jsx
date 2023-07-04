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

    //   const options = {
    //     weekday: "long",
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    //     timeZone: "America/Indianapolis",
    //     timeZoneName: "short"
    //   };
    //     const dateObj = new Date(event.dates.start.dateTime);
    //     const dateStr = dateObj ? dateObj.toLocaleString("en-GB",options) : '';
    //     const timeStr = dateObj ? dateObj.toLocaleTimeString("en-US", { timeZone:"America/Indianapolis", timeZoneName: "short" }) : '';

    return (
    <>
    Upcoming Events
    <div className="flex flex-nowrap snap-x scroll-smooth slideshow-container">
    {sortedEvents.slice(0,5).map((event, i) => 
        <div className="w-1/3 p-3 mySlides fade" >
            {/* <div class="numbertext">{i+1} / 5</div> */}
            <img className="w-full h-48 object-cover" src={event?.images[0].url} />
            <div class="text">{event.name}</div>
        </div>
    )}
    </div>
    </>
    )
}