import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"

export default function SearchResults(props) {
    
    const location = useLocation();
    // const {searchResults, searchQuery} = location.state;
    const {searchQuery} = location.state;
    console.log("search results", props.searchResults);
    console.log("search query", searchQuery);

    return (
    <>
    <h1 className="text-left text-1xl my-2 mb-4 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Search results</h1>
    
    {props.searchResults && props.searchResults.length > 0 ? (
    <div>
    <h1 className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{props.searchResults?.length} search result(s) for "{searchQuery}"</h1>
    <div className="flex flex-wrap">
    {props.searchResults.map(result => 
    <div>
        <img className="w-full h-40 object-cover" src={result.images[0].url} />
        <Link to={`/events/${result?._id}`}>{result.name}</Link>
        
    </div>)}
    </div>
    </div>) : (
    <h1>{props?.searchResults?.msg}</h1>)}
    
    
    </>
    )
}