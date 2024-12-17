import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATHS } from "../../../Routes";
// import { setAuth } from "../../../redux/AuthSlice";

const Nav = styled.div`
  border-top: 3px solid green;
  position: fixed;
  transition: all ease 0.3s;
  background-color: #fff;
  z-index: 185856;
  top: 50px;
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
  gap: 1rem;
  margin: auto;
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
const PhoneNav = ({ show }) => {
  const dispatch = useDispatch();
  return (
    <Nav show={show}>
      <Container>
        <Flex1>
          <ITEM>
            <NavMobItem>
              {" "}
              <Link to={PATHS.HOME}>Home</Link>
            </NavMobItem>
          </ITEM>
          <ITEM>
            <NavMobItem>My Jobs</NavMobItem>
          </ITEM>
          <ITEM>
            <Link to="/home" style={{ textDecoration: "none", color: "green" }}>
              <NavMobItem>Reports</NavMobItem>
            </Link>
          </ITEM>
          <ITEM>
            <Link style={{ textDecoration: "none", color: "green" }} to="/home">
              <NavMobItem>
                <p style={{ fontSize: "14px", fontWeight: "bold" }}>Messages</p>
              </NavMobItem>
            </Link>
          </ITEM>
        </Flex1>
        <Line />
        <Flex2>
          <p>User agreement</p>
          <p>Partnership</p>
          <p>Privacy policy</p>
        </Flex2>
        <Line />
        <Flex2>
          <LogOut
            onClick={() => {
              window.location.reload();
              // dispatch(setAuth(false));
              localStorage.clear();
            }}
            style={{
              width: "fit-content",
              textAlign: "center",
              marginTop: "2rem",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "0.5rem",
              borderRadius: "5px",
              border: "1px solid red",
            }}
          >
            Logout
          </LogOut>
        </Flex2>
      </Container>
    </Nav>
  );
};

export default PhoneNav;
