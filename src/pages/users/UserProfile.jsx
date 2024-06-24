import { useSelector } from "react-redux";
import Avatar from "../../components/avatar/Avatar";
import LeftSidebar from "../../components/leftsidebar/LeftSidebar";
import { useParams } from "react-router-dom";
import "./UserProfile.css";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useState } from "react";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";

function UserProfile() {
  const users = useSelector((state) => state.UsersReducer);
  const { id } = useParams();

  const currentProfile = users?.allUserData?.filter(
    (user) => user._id === id
  )[0];
  const currentUser = useSelector((state) => state.CurrentUserReducer);

  const [switchProfile, setSwitchProfile] = useState(false);

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <div className="user-details-2" key={currentProfile?._id}>
                <Avatar
                  backgroundColor="purple"
                  color="white"
                  fontSize="50px"
                  px="50px"
                  py="30px"
                >
                  {currentProfile?.name?.charAt(0).toUpperCase()}
                </Avatar>
                <div className="user-name">
                  <h1> {currentProfile?.name} </h1>
                  <p>
                    {" "}
                    <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                    {moment(currentProfile?.joinedOn).fromNow()}{" "}
                  </p>
                </div>
              </div>
            </div>
            {currentUser?.result?._id === id && (
              <button
                type="button"
                onClick={() => setSwitchProfile(true)}
                className="edit-profile-btn"
              >
                <FontAwesomeIcon icon={faPen} />
                Edit Profile
              </button>
            )}
          </div>
          <>
            {switchProfile ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitchProfile={setSwitchProfile}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
