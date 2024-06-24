import * as api from "../api";
import { setCurrentUser } from "./CurrentUser.action";
import { fetchAllUsers } from "./Users.action";

export const signup = (authData, navigate, location) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", payload: data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    dispatch(fetchAllUsers());
    navigate(location?.state?.from?.pathname || "/");
  } catch (error) {
    console.error("Error during signup:", error);
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", payload: data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error);
    alert(" user Not Found");
  }
};
