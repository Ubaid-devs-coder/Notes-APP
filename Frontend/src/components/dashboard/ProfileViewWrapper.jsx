import ProfileView from "./ProfileView.jsx";

const ProfileViewWrapper = ({ onLogout, onChangeView }) => {
  return <ProfileView onLogout={onLogout} onChangeView={onChangeView} />;
};

export default ProfileViewWrapper;
