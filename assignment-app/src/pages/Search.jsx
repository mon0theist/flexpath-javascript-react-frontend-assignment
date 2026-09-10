import { React, useState } from "react";

{
  /* If you are on the Search page and have executed a search that returns results, those should not disappear if you navigate to the "Home" page and then back to the "Search" page. It is fine if the dropdown option and text search field are reset, but the results should NOT be reset from jumping between routes in the app.*/
}

// const data = await fetch(`/api/data/search`)
// returns array of objects
// This route takes 2 optional query parameters:
// filterType
// keyword

// Valid values for the filterType are:
// const filterTypeOptions = ["gender", "operatingSystem", "model", "behaviorclass"]

// const data = await fetch(`/api/data/search`)
// This route takes 2 optional query parameters:

// pseudocode
// User selects a filter from the dropdown => filterState is set (controlled component)
// User optionally enters a keyword => keyword state is set (controlled component)
// form is submitted
//    update URL params
//    run actual search with fetch and URL params
//    ...what is the actual purpose of affecting URL params at all then?

// lifting state to App so that search results can persist

export default function Search(props) {
  const [filterState, setfilterState] = useState("");
  const [keywordState, setKeywordState] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [isFirstPageLoad, setIsFirstPageLoad] = useState(true);

  const numResults = props.searchResultState.length;

  async function performSearch(event) {
    event.preventDefault();
    setLoadingState(true);
    setIsFirstPageLoad(false);
    const response = await fetch(
      `/api/data/search/?filterType=${filterState}&keyword=${keywordState}`,
    );
    const searchResult = await response.json(); // array of objects, need to array.map() to display them
    props.setSearchResultState(searchResult);
    setLoadingState(false);
    console.log(searchResult);
    appUsageTime(searchResult);
    // using searchResult instead of props.searchResultState, because props.searchResultState doesn't actually update until next render
    // whereas searchResult is already the "current/updated" value
  }

  function appUsageTime(searchResult) {
    let accumulator = 0;
    let counter = 0;
    searchResult.forEach((result) => {
      accumulator = accumulator + Number(result["App Usage Time (min/day)"]);
      counter++;
    });
    const average = Math.floor(accumulator / counter);
    console.log("Accumulator: " + accumulator);
    console.log("Counter: " + counter);
    console.log("Average: " + average);
    return average;
  }

  function getMedian(array) {
    // sort array
    const sortedArray = [...array]
    sortedArray.sort(function (a, b) {
      return a - b;
    });
    // determine even or odd array.length
    if (sortedArray.legnth % 2 === 0){
      // even
    }
    else if (sortedArray.length % 2 === 1){
      // odd
      return 
    }
  }

  function btnHelperText() {
    let text = "";

    if (loadingState) {
      text = "Loading...";
    } else if (loadingState === false && isFirstPageLoad === true) {
      text = "";
    } else if (loadingState === false && numResults < 1) {
      text = "No results found";
    } else if (loadingState === false && numResults > 0) {
      text = `Displaying ${numResults} records`;
    }

    return <p>{text}</p>;
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
                <label htmlFor="filterType" className="form-label">
                  Select data point to filter search by:
                </label>
              </div>
              <div className="mb-4">
                <select
                  name="filterType"
                  id="filterType"
                  value={filterState}
                  className="w-25"
                  onChange={(event) => setfilterState(event.target.value)}
                >
                  <option value="" disabled selected hidden>
                    Select Filter...
                  </option>
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
              {btnHelperText()}
            </form>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">App Usage Time (min/day)</h5>
                <p className="card-text">
                  Average -{" "}
                  {Number.isNaN(appUsageTime(props.searchResultState))
                    ? 0
                    : appUsageTime(props.searchResultState)}{" "}
                  Minutes
                </p>
                <p className="card-text">Median - 0 Minutes</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Screen On Time (hours/day)</h5>
                <p className="card-text">Average - 0 Hours</p>
                <p className="card-text">Median - 0 Hours</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Number of Apps Installed</h5>
                <p className="card-text">Average - 0 Apps</p>
                <p className="card-text">Median - 0 Apps</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Age</h5>
                <p className="card-text">Average - 0 Years Old</p>
                <p className="card-text">Median - 0 Years Old</p>
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
                {props.searchResultState.map((result) => {
                  return (
                    <tr key={result["User ID"]}>
                      <td>{result["User ID"]}</td>
                      <td>{result["Device Model"]}</td>
                      <td>{result["Operating System"]}</td>
                      <td>{result["App Usage Time (min/day)"]}</td>
                      <td>{result["Screen On Time (hours/day)"]}</td>
                      <td>{result["Battery Drain (mAh/day)"]}</td>
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
