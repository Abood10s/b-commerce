import React, { useState } from "react";
// import { CiSearch, CiMenuBurger } from "react-icons/ci";
// import { RiNotification2Fill } from "react-icons/ri";
// import { RiParentFill } from "react-icons/ri";
// import defaultAvatar from "../../assets/profile.png";
// import PopUpMenu from "../PopupMenu";

import "./style.css";
const showSearchAnimation = { animation: "showSearch 0.2s forwards" };
const hideSearchAnimation = { animation: "hideSearch 0.1s forwards" };
const Navbar = ({ isShown, setIsShown }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="navbar">
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <h1 className="menu icon" onClick={() => setIsShown(!isShown)}>
          X
        </h1>
        {/* <div className="search-cont"> */}
        {/* <CiSearch
            className="icon search-icon"
            onClick={() => setShowSearch(!showSearch)}
            style={{ color: showSearch ? "#6366F1" : "inherit" }}
          /> */}
        {/* <input
            type="search"
            className={`search-input`}
            placeholder="Search"
            style={showSearch ? showSearchAnimation : hideSearchAnimation}
          /> */}
        {/* </div> */}
      </div>
      <div className="right-icons">
        {/* <RiParentFill className="icon" />{" "}
        <RiNotification2Fill className="icon" /> */}
        <div className="avatar" onClick={() => setShowMenu(!showMenu)}>
          <img src={"defaultAvatar"} alt="profile" />
        </div>
        {/* <PopUpMenu
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          classStyle="account-menu"
        >
          <h4>Account</h4>
          <small>Abood maher</small>
          <div className="line"></div>
          <button className="sign-out">Signout</button>
        </PopUpMenu> */}
      </div>
    </div>
  );
};

export default Navbar;
