import { useSelector } from "react-redux";
import User from "./User";
import "./Users.css";

function UsersList() {
  const users = useSelector((state) => state.UsersReducer);

  return (
    <div className="userList-container">
      {users?.allUserData?.map((user) => {
        return <User user={user} key={user?._id} />;
      })}
    </div>
  );
}

export default UsersList;
