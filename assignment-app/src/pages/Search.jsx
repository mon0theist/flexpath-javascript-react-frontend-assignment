import{ React, useState } from "react";
import { useParams } from 'react-router-dom';


{
  /* If you are on the Search page and have executed a search that returns results, those should not disappear if you navigate to the "Home" page and then back to the "Search" page. It is fine if the dropdown option and text search field are reset, but the results should NOT be reset from jumping between routes in the app.
    
    ie this will need State
    
    */
}

const [searchResults, getSearchResults] = useState("");

// const data = await fetch(`/api/data/search`)
// returns array of objects 

// This route takes 2 optional query parameters:
// filterType
// keyword

// The keyword is whatever a user types in the search bar before hitting the Search button. The filterType is whichever field in the dataset they choose to run this keyword search against.

// Valid values for the filterType are:
// const filterTypeOptions = ["gender", "operatingSystem", "model", "behaviorclass"]

export default function Search() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Search Page</h1>
          <p>Content goes here</p>
        </div>
      </div>
    </div>
  );
}
