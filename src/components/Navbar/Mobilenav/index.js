import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATHS } from "../../../Routes";
import { useSelector } from "react-redux";

const Nav = styled.div`
  border-top: 3px solid green;
  position: fixed;
  transition: all ease 0.3s;
  background-color: #fff;
  z-index: 185856;
  top: 70px;
  width: 100%;
  bottom: 0;
  right: ${(props) => (props.show ? "0" : "-110%")};
  @media (min-width: 1200px) {
    display: none;
  }
`;
export const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  color: green;
`;
export const Flex1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2em;
`;
const Line = styled.div`
  height: 1px;
  background-color: #123;
  margin: 1rem 0;
`;
export const Flex2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
`;
const NavMobItem = styled.div`
  display: flex;
  gap: 0.3rem;
  font-size: 1rem;
  margin: auto;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
`;
const LogOut = styled.h4`
  transition: all 0.2s ease;
  color: red;

  cursor: pointer;
  &:hover {
    background-color: red;
    color: #fff;
  }
`;
const ITEM = styled.div`
  cursor: pointer;
  padding: 0.4rem;
  transition: all 0.2s ease;
  width: 100%;
  &:hover {
    background-color: #e3e8ee;
    transform: translateX(4px);
    border-left: 5px solid green;
  }
`;
const PhoneNav = ({ show, closeNav }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Nav show={show ? "true" : undefined}>
      <Container>
        <Flex1>
          <ITEM>
            <Link
              to={PATHS.HOME}
              onClick={closeNav}
              style={{ textDecoration: "none", fontWeight: "450" }}
            >
              <NavMobItem>الرئيسية</NavMobItem>
            </Link>
          </ITEM>
          <ITEM>
            <Link
              to={PATHS.CART}
              onClick={closeNav}
              style={{ textDecoration: "none", fontWeight: "450" }}
            >
              <NavMobItem>
                {user?.userTypeName === "Admin" && (
                  <Link
                    to={PATHS.DASHBOARD}
                    style={{ textDecoration: "none", fontWeight: "bold" }}
                  >
                    لوحة التحكم
                  </Link>
                )}
                {/* <BiCartAlt style={{ fontSize: "1.55rem", cursor: "pointer" }} /> */}
              </NavMobItem>
            </Link>
          </ITEM>
        </Flex1>
        <Line />
        <Flex2>
          <LogOut
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              window.location.reload();
            }}
            style={{
              textAlign: "center",
              margin: "2rem auto",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              border: "1px solid red",
            }}
          >
            تسجيل الخروج
          </LogOut>
        </Flex2>
      </Container>
    </Nav>
  );
};

export default PhoneNav;
