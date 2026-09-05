import { React, useState } from "react";
import { useSearchParams } from "react-router-dom";

{
  /* If you are on the Search page and have executed a search that returns results, those should not disappear if you navigate to the "Home" page and then back to the "Search" page. It is fine if the dropdown option and text search field are reset, but the results should NOT be reset from jumping between routes in the app.
    
    ie this will need State
    
    */
}

// const data = await fetch(`/api/data/search`)
// returns array of objects

// This route takes 2 optional query parameters:
// filterType
// keyword

// The keyword is whatever a user types in the search bar before hitting the Search button. The filterType is whichever field in the dataset they choose to run this keyword search against.

// Valid values for the filterType are:
// const filterTypeOptions = ["gender", "operatingSystem", "model", "behaviorclass"]

// const data = await fetch(`/api/data/search`)
// This route takes 2 optional query parameters:

// filterType
// keyword

// Filter types:
// const filterTypeOptions = ["gender", "operatingSystem", "model", "behaviorclass"]

// searchquery would be something like ?keyword=searchterm&filterType=option

export default function Search() {
  const [searchResults, getSearchResults] = useState("");

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <form>
              <div className="mb-1">
                <label for="datapoint" className="form-label">
                  Select data point to filter search by:
                </label>
              </div>
              <div className="mb-4">
                <select name="datapoint" id="datapoint" className="w-25">
                  <option value="">Gender</option>
                  <option value="">Operating System</option>
                  <option value="">Model</option>
                  <option value="">Behavior Class</option>
                </select>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control w-50"
                  id="keyword"
                  placeholder="Search by Keyword"
                />
              </div>
              <button type="submit" className="btn btn-light w-50">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-3 border">1</div>
          <div className="col-3 border">2</div>
          <div className="col-3 border">3</div>
          <div className="col-3 border">4</div>
        </div>
      </div>
    </>
  );
}
