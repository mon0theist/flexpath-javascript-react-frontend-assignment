import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="navbar-brand ms-4 nav-link">
              User Behavior Data
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="ms-4 nav-link active">
              Search Through Dataset
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
    </>
  );
};

export default Nav;
