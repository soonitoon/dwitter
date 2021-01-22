import React from "react";
import { Link } from "react-router-dom";
import "components/CSS/style_Main.css";
import { IoLogoTwitter } from "react-icons/io5";
import { HiHashtag, HiOutlineCog } from "react-icons/hi";

const Navigation = ({ userObj }) => (
  <nav>
    <div className="navContainer">
      <IoLogoTwitter className="twitteIcon" />
      <ul className="linkList">
        <li className="goHome">
          <HiHashtag className="hashIcon" />
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li className="goProfile">
          <HiOutlineCog className="gearIcon" />
          <Link to="/profile" className="link">
            {userObj.displayName} profile
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navigation;
