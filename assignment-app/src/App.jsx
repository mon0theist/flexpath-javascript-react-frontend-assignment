import { React, useState } from "react";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";

// Will use these later
// const data = await fetch(`/api/data/search`);
// const filterTypeOptions = ["gender", "operatingSystem", "model", "behaviorclass"];

{
  /* use <Link /> components instead of <a> tags */
}

function App() {
  const [searchResultState, setSearchResultState] = useState([]);

  return (
    <>
      <Nav />
      <Routes>
        {/* <Route path="" element={} /> */}
        <Route path="/" element={<Home />}></Route>
        <Route
          path="search"
          element={
            <Search
              searchResultState={searchResultState}
              setSearchResultState={setSearchResultState}
            />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
