import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function EventsByCategory(){
    const location = useLocation();
    const {categoryArray, categoryName} = location.state;
    console.log(categoryArray)

    const widestImage = function (event) {
        const images = event.images
        if (!images || !images.length) return undefined
        const widths = images.map(img => img.width)
        const index = widths.indexOf(Math.max(...widths))
        console.log("index", index, images)
        return images[index].url
      }
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
    return (
    <>
    
    <h1 className="text-left text-1xl my-2 mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{categoryName}</h1>
    <div className="flex flex-wrap">
    {categoryArray.map(category => {
        const dateISO = category?.dates?.start?.dateTime;
        const dateObj = dateISO ? new Date(dateISO) : null;
        const dateStr = dateObj ? dateObj.toLocaleString('en-GB', options) : '';
        const timeStr = dateObj
          ? dateObj.toLocaleTimeString('en-US', {
            timeZone: category?._embedded?.venues[0]?.timezone,
            timeZoneName: 'short',
            hour: 'numeric',
            minute: 'numeric'
          })
          : '';
        return ( 
        <div className="w-1/3 p-3">
            
            <Link to={`/events/${category?._id}`}><img className="w-full h-40 object-cover" src={widestImage(category)} /> {category?.name}</Link>
            {category?.dates?.start?.dateTime ? (<p>{dateStr} {timeStr}</p>):(<p>Date & time to be announced</p>)}
        </div>
    )})}
    </div>
    </>
    )
}