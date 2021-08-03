import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "components/CSS/style_Main.css";
import { HiOutlineCog } from "react-icons/hi";

const Navigation = ({ userObj }) => {
  const [displayName, setDisplayName] = useState("username");
  useEffect(() => {
    if (userObj.displayName) {
      setDisplayName(userObj.displayName);
    }
  }, [userObj.displayName]);
  return (
    <nav>
      <div className="nav-container">
        <h5 className="home-link">
          <Link to="/" className="link">
            Home
          </Link>
        </h5>
        <h5 className="profile-link">
          <HiOutlineCog className="gear-icon" />
          <Link to="/profile" className="link profile-name">
            {displayName}
          </Link>
        </h5>
      </div>
    </nav>
  );
};

export default Navigation;
