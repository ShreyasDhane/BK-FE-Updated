import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function RequiresAuth({ children }) {
  let location = useLocation();
  const User = useSelector((state) => state.CurrentUserReducer);

  return User ? children : <Navigate to="/Auth" state={{ from: location }} />;
}

export default RequiresAuth;
