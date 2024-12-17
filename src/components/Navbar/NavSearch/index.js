import React, { useState } from "react";
import { Link } from "react-router-dom";
// import CustomizedMenus from "../../Menu/Menu";
import { Holder, NavSearchContiner, SearchInput } from "./style";

const NavSearch = () => {
  const [query, setQuery] = useState("");

  return (
    <NavSearchContiner>
      <Holder>
        {query ? (
          <Link to={`/search/${query}`}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>
        ) : (
          <i className="fa-solid fa-magnifying-glass"></i>
        )}

        <SearchInput
          type="search"
          name="navsearch"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
      </Holder>
      <p>|</p>
      <Holder>
        {/* <CustomizedMenus name="Jobs" data={["Jobs", "Talents", "Projects"]} /> */}
      </Holder>
    </NavSearchContiner>
  );
};

export default NavSearch;
