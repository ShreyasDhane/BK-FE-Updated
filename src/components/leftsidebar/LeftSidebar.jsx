import "./LeftSidebar.css";
import { NavLink } from "react-router-dom";

import { FaGlobeAmericas } from "react-icons/fa";

function LeftSidebar() {
  return (
    <div className="left-sidebar">
      <div className="side-nav">
        {/* <NavLink to="/" className="side-nav-links" activeclass="active">
          <p>Home</p>
        </NavLink> */}
        <div className="side-nav-div">
          <div>
            <p></p>
            <NavLink
              to="/Questions"
              className="side-nav-links"
              activeclass="active"
            >
              <FaGlobeAmericas />
              <p style={{ paddingLeft: "40px" }}>Questions</p>
            </NavLink>
            <NavLink
              to="/Tags"
              className="side-nav-links"
              activeclass="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Tags</p>
            </NavLink>
            <NavLink
              to="/Users"
              className="side-nav-links"
              activeclass="active"
              style={{ paddingLeft: "40px" }}
            >
              <p>Users</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
