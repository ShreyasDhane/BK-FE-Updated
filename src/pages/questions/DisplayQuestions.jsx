import LeftSidebar from "../../components/leftsidebar/LeftSidebar";
import RightSidebar from "../../components/rightsidebar/RightSidebar";
import QuestionDetail from "./QuestionDetail";

function DisplayQuestions() {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <QuestionDetail />
        <RightSidebar />
      </div>
    </div>
  );
}

export default DisplayQuestions;
