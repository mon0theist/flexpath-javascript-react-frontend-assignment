import React from "react";
import Nav from './components/Nav';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Search from "./pages/Search"

// Will use these later
// const data = await fetch(`/api/data/search`);
// const filterTypeOptions = ["gender", "operatingSystem", "model", "behaviorclass"];

{/* use <Link /> components instead of <a> tags */}

function App() {
  return (
    <>
      <Nav />
      <Routes>
        {/* <Route path="" element={} /> */}
        <Route path="/" element={<Home />}></Route>
        <Route path="search" element={<Search />}></Route>
      </Routes>
    </>
  );
}

export default App;
