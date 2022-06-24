import * as React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";
import Logo from "../Logo/Logo";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo></Logo>
      <div className="navigation">
        <ul className="nav-links">
          <li>
          <Link to={"/#"}>Home</Link>
          </li>
          <li>
            <a href="/#About">About Us</a>
          </li>
          <li>
            <a href="/#Contact">Contact Us</a>
          </li>
          <li>
          <Link to={"/purchases"}>Past Orders</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
