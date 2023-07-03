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
    {props.searchResults && props.searchResults.length > 0 ? (
    <div>
    <h1>{props.searchResults?.length} search result(s) for "{searchQuery}"</h1>
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