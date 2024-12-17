import React, { useState } from "react";

import { PATHS } from "../../Routes/index";

import NavSearch from "./NavSearch";
import {
  HomeLogo,
  Logout,
  Mobilenav,
  Nav,
  NavFlex1,
  NavFlex2,
  SVGS,
} from "./style";
import { BiCartAlt } from "react-icons/bi";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbMenu } from "react-icons/tb";
import { FiX } from "react-icons/fi";
import PhoneNav from "./Mobilenav";
import { Chip } from "../CategoryFilter";
import styled from "styled-components";

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #123;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #696767;
  }
`;

export const Findwork = [
  "Find Work",
  "Saved Jobs",
  "Proposals",
  "Profile",
  "My Stats",
  "My Project Dashboard",
];
export const Myjobs = ["My Jobs", "All Contacts", "Work Diary"];
export const Reports = [
  "Overview",
  "My Reports",
  "Billings & Earnings",
  "Connects History",
  "Transaction History",
  "Certificate of Earnings",
];
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  return (
    <Nav>
      <Mobilenav>
        <HomeLogo to={PATHS.HOME}></HomeLogo>
        {clicked ? (
          <FiX onClick={() => setClicked(!clicked)} />
        ) : (
          <TbMenu onClick={() => setClicked(!clicked)} />
        )}
      </Mobilenav>
      <PhoneNav show={clicked ? true : false} />
      <NavFlex1>
        <Logo to={PATHS.HOME}>Edfa3 Banky</Logo>
      </NavFlex1>
      <NavFlex2>
        <NavSearch />
        {user?.userTypeName === "Admin" && (
          <Link
            to={PATHS.DASHBOARD}
            style={{ textDecoration: "none", fontWeight: "bold" }}
          >
            <Chip>Dashboard</Chip>
          </Link>
        )}
        <SVGS>
          <Link
            to={PATHS.CART}
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <BiCartAlt style={{ fontSize: "1.25rem", cursor: "pointer" }} />
            {cartItems?.length ? (
              <span style={{ color: "red" }}>{cartItems.length}</span>
            ) : null}
          </Link>
        </SVGS>
        <Logout
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </Logout>
      </NavFlex2>
    </Nav>
  );
};

export default Navbar;
