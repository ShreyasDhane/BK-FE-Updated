import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AllRoutes from "./AllRoutes";
import Navbar from "./components/navbar/Navbar";
import { fetchAllQuestions } from "./actions/Question.action";
import { fetchAllUsers } from "./actions/Users.action";
import Fallback from "./Fallback";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      

      <div className="parent">
        <Navbar />
        <AllRoutes />
      </div>
      <div className="fallback">
        <Fallback />
      </div>
    </>
  );
}

export default App;
