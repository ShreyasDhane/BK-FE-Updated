import "./HomeMainbar.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import QuestionList from "./QuestionList";

function HomeMainbar() {
  const questionsList = useSelector((state) => state.QuestionReducer);

  const location = useLocation();

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <Link to="/AskQuestion" className="ask-btn">
          Ask a Question
        </Link>
      </div>
      <div>
        {questionsList?.data === null ? (
          <>
            <h1>Loading...</h1>
          </>
        ) : (
          <>
            <p>{questionsList?.data?.length} questions</p>
            <QuestionList questionsList={questionsList?.data} />
          </>
        )}
      </div>
    </div>
  );
}

export default HomeMainbar;
