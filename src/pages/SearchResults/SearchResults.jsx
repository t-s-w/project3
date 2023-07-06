import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"

export default function SearchResults(props) {
    
    const location = useLocation();
    // const {searchResults, searchQuery} = location.state;
    const {searchQuery} = location.state;
    console.log("search results", props.searchResults);
    console.log("search query", searchQuery);

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
    <h1 className="text-left text-1xl my-2 mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Search results</h1>
    
    {props.searchResults && props.searchResults.length > 0 ? (
    <div>
    <h1 className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{props.searchResults?.length} search result(s) for "{searchQuery}"</h1>
    <div className="flex flex-wrap">
    {props.searchResults.map(result => { const dateISO = result?.dates?.start?.dateTime;
        const dateObj = dateISO ? new Date(dateISO) : null;
        const dateStr = dateObj ? dateObj.toLocaleString('en-GB', options) : '';
        const timeStr = dateObj
          ? dateObj.toLocaleTimeString('en-US', {
            timeZone: result?._embedded?.venues[0]?.timezone,
            timeZoneName: 'short',
            hour: 'numeric',
            minute: 'numeric'
          })
          : '';
          return (
    <div className="w-1/3 p-3">
        
        <Link to={`/events/${result?._id}`}><img className="w-full h-40 object-cover" src={widestImage(result)} />{result.name}</Link>
        {result?.dates?.start?.dateTime ? (<p>{dateStr} {timeStr}</p>):(<p>Date & time to be announced</p>)}
    </div>)})}
    </div>
    </div>) : (
    <h1>{props?.searchResults?.msg}</h1>)}
    
    
    </>
    )
}