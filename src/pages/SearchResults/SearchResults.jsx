import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"

export default function SearchResults() {
    
    const location = useLocation();
    // console.log("query", location.state);

    return <>{JSON.stringify(location.state)}</>
}