import LeftSidebar from "../../components/leftsidebar/LeftSidebar";
import "./Users.css";
import UsersList from "./UsersList";
import "./Users.css";

function Users() {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2" style={{ marginTop: "30px" }}>
        <h1 style={{ fontWeight: "400" }}>Users</h1>
        <UsersList />
      </div>
    </div>
  );
}

export default Users;
