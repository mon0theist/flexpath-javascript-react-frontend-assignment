import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        {/* <p> tag is a placeholder, You'll need to change the tag/component type later*/}
        <Link to="/">
          <p className="navbar-brand ms-4 nav-link">User Behavior Data</p>
        </Link>
        <Link to="/search">
          <p className="navbar-brand ms-4 nav-link">Search</p>
        </Link>
      </nav>
      <hr />
    </div>
  );
};

export default Nav;
