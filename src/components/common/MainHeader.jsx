import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const MainHeader = () => {
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 72) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);
  return (
    <>
      <nav className="main-header-wrapper">
        <ul className={`${colorChange && "color-change"} main-header`}>
          <li>
            <NavLink to="/">
              {" "}
              <div className="nav_header">
                <img
                  src="/assets/images/bricks_icon_orange.svg"
                  alt=""
                  className=" small_icon"
                />
                <p className="sub-title">MyBricks</p>
              </div>
            </NavLink>
          </li>
          <li className="ms-auto">
            <ul className="collapse-nav">
              <li>
                <NavLink to="/" className={"normal-para"}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className={"normal-para"}>
                  Learn
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className={"normal-para"}>
                  Portfolio
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className={"normal-para"}>
                  Team & Partners
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className={"normal-para"}>
                  Docs
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className={"normal-para"}>
                  Login
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <button className="button">Create Account</button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MainHeader;
