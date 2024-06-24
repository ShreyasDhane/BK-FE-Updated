import HomeMainbar from "../../components/homemainbar/HomeMainbar";
import LeftSidebar from "../../components/leftsidebar/LeftSidebar";
import RightSidebar from "../../components/rightsidebar/RightSidebar";

import "../../App.css";

function Home() {
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

export default Home;
