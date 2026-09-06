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
  const [searchResults, getSearchResults] = useState("No Records to Display");
  const [searchParams, setSearchParams] = useSearchParams({})

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
                  <option value="">Model</option>
                  <option value="">Operating System</option>
                  <option value="">Gender</option>
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
              <p>No records to display</p>
            </form>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">App Usage Time (min/day)</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card’s content.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Screen On Time (hours/day)</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card’s content.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Number of Apps Installed</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card’s content.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Age</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card’s content.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">User ID</th>
                  <th scope="col">Device Model</th>
                  <th scope="col">Operating System</th>
                  <th scope="col">App Usage Time (min/day)</th>
                  <th scope="col">Screen On Time (hours/day)</th>
                  <th scope="col">Battery Drain (mAH/day)</th>
                  <th scope="col">Number of Apps Installed</th>
                  <th scope="col">Data Usage (MB/day)</th>
                  <th scope="col">Age</th>
                  <th scope="col">Gender</th>
                  <th scope="col">User Behavior Class</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>John</td>
                  <td>Doe</td>
                  <td>@social</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
