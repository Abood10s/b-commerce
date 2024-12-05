import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/slices/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout()); // Trigger the logout action
  };
  return (
    <div>
      HomePage
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
