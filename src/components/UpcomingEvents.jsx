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
    {sortedEvents.slice(0,5).map(event => 
    <div className="flex flex-wrap">
    <div className="w-1/3 p-3" >
    <img className="w-full h-40 object-cover" src={event?.images[0].url} />
    <p>{event.name}</p>
    </div>
    </div>)}
    </>
    )
}