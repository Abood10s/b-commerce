import React, { useState } from "react";

import { PATHS } from "../../Routes/index";

import NavSearch from "./NavSearch";
import {
  CartHover,
  DashboardButton,
  HomeLogo,
  Logout,
  Mobilenav,
  Nav,
  NavFlex1,
  SVGS,
  Username,
} from "./style";
import { BiCartAlt } from "react-icons/bi";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TbMenu } from "react-icons/tb";
import { FiX } from "react-icons/fi";
import PhoneNav from "./Mobilenav";
import { Chip } from "../CategoryFilter";
import styled from "styled-components";

const Logo = styled(Link)`
  text-decoration: none;
  color: #123;
  font-size: 1.5rem;
`;

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart);

  const [clicked, setClicked] = useState(false);

  return (
    <Nav>
      <Mobilenav>
        <HomeLogo to={PATHS.HOME}>Edfa3 Banky</HomeLogo>
        {clicked ? (
          <FiX onClick={() => setClicked(false)} />
        ) : (
          <TbMenu onClick={() => setClicked(true)} />
        )}
      </Mobilenav>
      <PhoneNav show={clicked} closeNav={() => setClicked(false)} />
      <NavFlex1>
        <Logo to={PATHS.HOME}>Edfa3 Banky</Logo>
      </NavFlex1>
      <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
        {user?.userTypeName === "Admin" && (
          <DashboardButton>
            <Link
              to={PATHS.DASHBOARD}
              style={{ textDecoration: "none", fontWeight: "bold" }}
            >
              <Chip>لوحة التحكم</Chip>
            </Link>
          </DashboardButton>
        )}
        <Username className="username">{user.fullName}</Username>
        <SVGS>
          <Link
            to={PATHS.CART}
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CartHover>
              <BiCartAlt style={{ fontSize: "1.55rem", cursor: "pointer" }} />
            </CartHover>
            {cartItems?.length ? (
              <span
                style={{
                  color: "white",
                  height: "20px",
                  width: "20px",
                  borderRadius: "50%",
                  backgroundColor: "Green",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {cartItems.length}
              </span>
            ) : null}
          </Link>
        </SVGS>
        <Logout
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("cart");
            window.location.reload();
          }}
        >
          تسجيل الخروج
        </Logout>
      </div>
    </Nav>
  );
};

export default Navbar;
