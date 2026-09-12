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
  const [errorState, setErrorState] = useState(false);
  const [errorCodeState, setErrorCodeState ] = useState("");

  const numResults = props.searchResultState.length;

  async function performSearch(event) {
    event.preventDefault();
    setLoadingState(true);
    setIsFirstPageLoad(false);
    setErrorState(false);

    try {
      const response = await fetch(`/api/data/search/?filterType=${filterState}&keyword=${keywordState}`);
      const searchResult = await response.json(); // array of objects, need to array.map() to display them
      props.setSearchResultState(searchResult);
      // console.log(searchResult);
    }
    catch (error){
      setErrorState(true);
      setErrorCodeState(error.message)
    }
    finally {
      setLoadingState(false);
    }
  };

  // need to extract data from specific columns to calculate stats cards,
  // otherwise I'd have to write 8 separate redundant functions
  function extractColumn(searchResult, colName) {
    // might need to account for empty search results
    let colData = [];
    searchResult.forEach((result) => {
      colData.push(Number(result[colName]));
    });
    return colData;
  }

  function getAverage(colData) {
    let accumulator = 0;
    let counter = 0;
    // have to account for empty search results
    if (colData.length === 0) {
      return 0;
    } else {
      colData.forEach((result) => {
        accumulator = accumulator + Number(result);
        counter++;
      });
      const average = Math.floor(accumulator / counter);
      // console.log("Accumulator: " + accumulator);
      // console.log("Counter: " + counter);
      // console.log("Average: " + average);
      return average;
    }
  }

  function getMedian(colData) {
    // https://www.geeksforgeeks.org/javascript/how-to-get-median-of-an-array-of-numbers-in-javascript/
    // sort array
    const sortedArray = [...colData];
    sortedArray.sort(function (a, b) {
      return a - b;
    });
    // determine even or odd array.length
    // also need to make sure the array is not empty (ie no search results)
    if (sortedArray.length === 0) {
      return 0;
    } else if (sortedArray.length % 2 === 0) {
      // even
      // average of the two middle indices
      // "For any even-length array, the two middle indices are always length/2 and (length/2) - 1"
      // ^ because of zero-indexing
      const avg =
        (sortedArray[sortedArray.length / 2] +
          sortedArray[sortedArray.length / 2 - 1]) /
        2;
      return avg;
    } else if (sortedArray.length % 2 === 1) {
      // odd
      // dividing in half will likely have a remainder/decimal,
      // so math.floor will round down to the nearest whole number
      return sortedArray[Math.floor(sortedArray.length / 2)];
    }
  }

  function btnHelperText() {
    let text = "";

    if (loadingState) {
      text = "Loading...";
    } else if (loadingState === false && isFirstPageLoad === true) {
      text = "";
    } else if (loadingState === false && numResults < 1) {
      text = "No Records to Display";
    } else if (loadingState === false && numResults > 0) {
      text = `Displaying ${numResults} Records`;
    }

    return <p>{text}</p>;
  }

  function loadTable() {
    return (
      <>
        {props.searchResultState.map((result) => {
          return (
            <tr key={result["User ID"]}>
              <td>{Number(result["User ID"])}</td>
              <td>{result["Device Model"]}</td>
              <td>{result["Operating System"]}</td>
              <td>
                {Number(result["App Usage Time (min/day)"]).toLocaleString(
                  "en-US",
                )}
              </td>
              <td>
                {Number(result["Screen On Time (hours/day)"]).toLocaleString(
                  "en-US",
                )}
              </td>
              <td>
                {Number(result["Battery Drain (mAh/day)"]).toLocaleString(
                  "en-US",
                )}
              </td>
              <td>
                {Number(result["Number of Apps Installed"]).toLocaleString(
                  "en-US",
                )}
              </td>
              <td>
                {Number(result["Data Usage (MB/day)"]).toLocaleString("en-US")}
              </td>
              <td>{Number(result["Age"])}</td>
              <td>{result["Gender"]}</td>
              <td>{result["User Behavior Class"]}</td>
            </tr>
          );
        })}
      </>
    );
  }

  function showError(err) {
    return (
      <div className="d-grid gap-2">
        <button type="button" className="btn btn-outline-danger" disabled>
          ⚠️ <strong>ERROR</strong>: {"{"}{err}{"}"} - Please try again later
        </button>
      </div>
    );
  }

  // extract column data
  const appUsageTime = extractColumn(
    props.searchResultState,
    "App Usage Time (min/day)",
  );
  const screenOnTime = extractColumn(
    props.searchResultState,
    "Screen On Time (hours/day)",
  );
  const numApps = extractColumn(
    props.searchResultState,
    "Number of Apps Installed",
  );
  const age = extractColumn(props.searchResultState, "Age");

  // calculate avg
  const avgAppUsage = getAverage(appUsageTime);
  const avgScreenTime = getAverage(screenOnTime);
  const avgNumApps = getAverage(numApps);
  const avgAge = getAverage(age);

  // calculate median
  const medAppUsage = getMedian(appUsageTime);
  const medScreenTime = getMedian(screenOnTime);
  const medNumApps = getMedian(numApps);
  const medAge = getMedian(age);

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
                  <option value="" disabled hidden>
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
        {errorState ? showError(errorCodeState) : ""}
        <div className="row mt-4">
          <div className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">App Usage Time (min/day)</h5>
                <p className="card-text">Average - {avgAppUsage} Minutes</p>
                <p className="card-text">
                  Median - {Number(medAppUsage).toLocaleString("en-US")} Minutes
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Screen On Time (hours/day)</h5>
                <p className="card-text">
                  Average - {Number(avgScreenTime).toLocaleString("en-US")}{" "}
                  Hours
                </p>
                <p className="card-text">
                  Median - {Number(medScreenTime).toLocaleString("en-US")} Hours
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Number of Apps Installed</h5>
                <p className="card-text">
                  Average - {Number(avgNumApps).toLocaleString("en-US")} Apps
                </p>
                <p className="card-text">
                  Median - {Number(medNumApps).toLocaleString("en-US")} Apps
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Age</h5>
                <p className="card-text">
                  Average - {Number(avgAge).toLocaleString("en-US")} Years Old
                </p>
                <p className="card-text">
                  Median - {Number(medAge).toLocaleString("en-US")} Years Old
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
                {loadingState ? <tr><td>Loading Records...</td></tr> : loadTable()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
