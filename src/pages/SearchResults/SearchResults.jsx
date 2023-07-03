import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"

export default function SearchResults() {
    
    const location = useLocation();
    const {searchResults, searchQuery} = location.state;
    console.log("search results", searchResults);
    console.log("search query", searchQuery);

    return (
    <>
    {searchResults && searchResults.length > 0 ? (
    <div>
    <h1>{searchResults?.length} search result(s) for "{searchQuery}"</h1>
    <div className="flex flex-wrap">
    {searchResults.map(result => 
    <div>
        <img className="w-full h-40 object-cover" src={result.images[0].url} />
        <Link to={`/events/${result?._id}`}>{result.name}</Link>
        
    </div>)}
    </div>
    </div>) : (
    <h1>No search result(s) for "{searchQuery}"</h1>)}
    
    
    </>
    )
}