export default function UpcomingEvents ({events}) {
    const sortedEvents = events.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        const dateObjA = new Date(a.dates?.start?.dateTime);
        console.log("A", dateObjA)
        const dateObjB = new Date(b.dates?.start?.dateTime);
        console.log("B", dateObjB)
        return dateObjA - dateObjB;
      });
      console.log(sortedEvents);
// console.log(events[0].dates.start.dateTime)
    return (
    <>
    Upcoming Events
    {sortedEvents.slice(0,5).map(event => <p>{event.name}</p>)}
    </>
    )
}