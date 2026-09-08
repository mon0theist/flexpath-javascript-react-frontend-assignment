import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <Link to="/" className="navbar-brand ms-4 nav-link">
          User Behavior Data
        </Link>
        <Link to="/search" className="ms-4 nav-link navbar-text">
          Search Through Dataset
        </Link>
      </nav>
      <hr />
    </>
  );
};

export default Nav;
