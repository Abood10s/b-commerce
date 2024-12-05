import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/slices/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      HomePage
      <h1>Welcome {user?.email}</h1>
      <h1>phone number {user?.phoneNumber}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
