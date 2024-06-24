import "../../App.css";
import HomeMainbar from "../../components/homemainbar/HomeMainbar";
import LeftSidebar from "../../components/leftsidebar/LeftSidebar";
import RightSidebar from "../../components/rightsidebar/RightSidebar";

function Questions() {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <HomeMainbar />
        <RightSidebar />
      </div>
    </div>
  );
}

export default Questions;
