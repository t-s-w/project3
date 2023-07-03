import { useLocation } from "react-router-dom"

export default function SearchResults() {
    const location = useLocation();
    console.log(location.state);
    return <>Search Results</>
}