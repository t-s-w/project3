export default function UpcomingEvents ({events}) {
    const arrangedDate = events.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.events?.dates?.start?.dateTime) - new Date(a.events?.dates?.start?.dateTime);
      });
      console.log(arrangedDate);
    return (
    <>
    Upcoming Events
    {/* {eve} */}
    </>
    )
}