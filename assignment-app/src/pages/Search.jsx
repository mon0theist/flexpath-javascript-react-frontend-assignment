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
  const [datapointState, setDatapointState] = useState("model");
  const [keywordState, setKeywordState] = useState("");
  const [searchResultState, setSearchResultState] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  async function performSearch(event) {
    event.preventDefault();
    setSearchParams({
      filterType: datapointState,
      keyword: keywordState,
    });
    const response = await fetch(
      `/api/data/search/?filterType=${searchParams.filterType}&keyword=${searchParams.keyword}`,
    );
    const searchResult = await response.json(); // array of objects, need to array.map() to display them
    setSearchResultState(searchResult);
    console.log(searchResultState);
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <form
              onSubmit={(event) => {
                performSearch(event);
              }}
            >
              <div className="mb-1">
                <label htmlFor="datapoint" className="form-label">
                  Select data point to filter search by:
                </label>
              </div>
              <div className="mb-4">
                <select
                  name="datapoint"
                  id="datapoint"
                  value={datapointState}
                  className="w-25"
                  onChange={(event) => setDatapointState(event.target.value)}
                >
                  <option value="model">Model</option>
                  <option value="operatingSystem">Operating System</option>
                  <option value="gender">Gender</option>
                  <option value="behaviorClass">Behavior Class</option>
                </select>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control w-50"
                  id="keyword"
                  name="keyword"
                  placeholder="Search by Keyword"
                  value={keywordState}
                  onChange={(event) => setKeywordState(event.target.value)}
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
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">App Usage Time (min/day)</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card’s content.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Screen On Time (hours/day)</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card’s content.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Number of Apps Installed</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card’s content.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Age</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card’s content.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <table className="table">
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
                {searchResultState.map((result) => {
                  return (
                    <tr key={result["User ID"]}>
                      <td>{result["User ID"]}</td>
                      <td>{result["Device Model"]}</td>
                      <td>{result["Ooperating System"]}</td>
                      <td>{result["App Usage Time (min/day"]}</td>
                      <td>{result["Screen On Time (hours/day)"]}</td>
                      <td>{result["Battery Drain (mAH/day)"]}</td>
                      <td>{result["Number of Apps Installed"]}</td>
                      <td>{result["Data Usage (MB/day)"]}</td>
                      <td>{result["Age"]}</td>
                      <td>{result["Gender"]}</td>
                      <td>{result["User Behavior Class"]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
