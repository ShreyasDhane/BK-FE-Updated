import { useState } from "react";
import "./Auth.css";

import icon from "../../assets/icon.svg";
import AboutUs from "./AboutUs";
import { useNavigate, useLocation } from "react-router-dom";
import { signup, login } from "../../actions/Auth.action";
import { useDispatch } from "react-redux";
// import { AuthContext } from "../../context/AuthContext";

function Auth() {
  // const { setUser } = useContext(AuthContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [userSignupData, setUserSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleUserLoginInput = (e) => {
    const { name, value } = e.target;
    setUserSignupData({
      ...userSignupData,
      [name]: value,
    });
  };

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (
        !userSignupData?.name ||
        !userSignupData?.email ||
        !userSignupData?.password
      ) {
        alert("Empty Fields Detected");
      } else {
        dispatch(signup(userSignupData, navigate, location));
      }
    } else {
      if (!userSignupData?.email || !userSignupData?.password) {
        alert("Invalid Credentials");
      }
      dispatch(login(userSignupData, navigate, location));
    }

    setUserSignupData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <section className="auth-section">
      {isSignUp}
      <div className="auth-container-2">
        {!isSignUp && (
          <img src={icon} alt="stack overflow" className="login-logo" />
        )}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={userSignupData?.name}
                onChange={handleUserLoginInput}
                placeholder="Enter Display name"
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              value={userSignupData?.email}
              onChange={handleUserLoginInput}
              placeholder="Enter email"
              id="email"
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignUp && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forgot password
                </p>
              )}
            </div>
            <input
              type="password"
              name="password"
              value={userSignupData?.password}
              onChange={handleUserLoginInput}
              placeholder="Enter Password"
              id="password"
            />
            {isSignUp && (
              <p style={{ color: "#666767", fontSize: "13px" }}>
                {" "}
                Passwords must contain at least eight <br /> characters,
                including 1 letter and 1 <br /> number{" "}
              </p>
            )}
          </label>
          {/* {isSignUp && (
            <label htmlFor="check">
              <input type="checkbox" id="check" />
              <p style={{ fontSize: "13px" }}>
                Opt-in to receive occassional, <br /> product updates, user
                research invitations,
                <br /> company announcements, and digests.
              </p>
            </label>
          )} */}
          <button type="submit" className="auth-btn">
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
          {/* {isSignUp && (
            <p style={{ color: "#666767", fontSize: "13px" }}>
              By clicking the &quot;Sign up&quot;, you agree to ur{" "}
              <span style={{ color: "#007ac6" }}>
                {" "}
                terms of
                <br /> service{" "}
              </span>
              , <span style={{ color: "#007ac6" }}>privacy policy</span>{" "}
              <span style={{ color: "#007ac6" }}> and cookies policy.</span>
            </p>
          )} */}
        </form>
        <p>
          {isSignUp ? "already have an account?" : "Don't have an account?"}
          <button
            type="button"
            onClick={handleSwitch}
            className="handle-switch-btn"
          >
            {" "}
            {isSignUp ? "Log in" : "Sign up"}{" "}
          </button>
        </p>
      </div>
    </section>
  );
}

export default Auth;
