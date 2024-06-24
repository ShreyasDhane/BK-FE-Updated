import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Avatar from "../avatar/Avatar";
// import Button from "../button/Button";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/CurrentUser.action";

//image assets
import navbarStackImg from "../../assets/Bhimkatta.png";
import Search from "../../assets/magnifying-glass-solid.svg";
import { Link } from "react-router-dom";

//css file
import "./Navbar.css";

function Navbar() {
  const User = useSelector((state) => state.CurrentUserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch]);

  return (
    <nav className="main-nav">
      <div className="navbar">
        <Link to="/" className="nav-item nav-btn">
          <img
            className="nav-logo"
            src={navbarStackImg}
            alt="logo"
            width="100px"
            height="40px"
          />
          
        </Link>
        
        {/* <Link to="/" className="nav-item nav-btn-2">
          About
        </Link>
        <Link to="/" className="nav-item nav-btn-2">
          Products
        </Link>
        <Link to="/" className="nav-item nav-btn-2">
          For Teams
        </Link> */}
        <form>
          <input type="text" placeholder="Search...." />
          <img src={Search} alt="search" className="search-icon" />
        </form>
        {User === null ? (
          <Link to="/Auth" className="nav-item nav-links">
            Login
          </Link>
        ) : (
          <>
            <Avatar
              backgroundColor="#009dff"
              px="10px"
              py="4px"
              borderRadius="50%"
              color="white"
            >
              <Link
                to={`/Users/${User?.result?._id}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                {User.result.name.slice(0, 1).toUpperCase()}
              </Link>
            </Avatar>
            <button className="nav-item nav-links" onClick={handleLogout}>
              {" "}
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
