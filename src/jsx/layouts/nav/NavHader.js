import React, { useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";

export function NavMenuToggle() {
  setTimeout(() => {
    let mainwrapper = document.querySelector("#main-wrapper");
    if (mainwrapper.classList.contains('menu-toggle')) {
      mainwrapper.classList.remove("menu-toggle");
    } else {
      mainwrapper.classList.add("menu-toggle");
    }
  }, 200);
}

const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const { navigationHader, openMenuToggle, background } = useContext(
    ThemeContext
  );
  return (
    <div className="nav-header">
      <Link to="/home" className="brand-logo">
        {/* <svg className="logo" width="40" height="40" viewBox="0 0 64 61" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.0188 22.6571H56.1512L49.1323 33.9857H28.0756L38.6039 49.6714L31.585 61L7.0188 22.6571Z" fill="red" />
          <path d="M7.01891 0H56.1513L63.1702 12.2H0L7.01891 0Z" fill="var(--primary)" />

        </svg> */}

        <img src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t1.15752-9/377153402_6739383419493926_3889825638115928356_n.png?_nc_cat=101&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeGQFnQvBa_H_WOFh7_163_Dle2c03hcyBiV7ZzTeFzIGPxjMgh7je46qGyXemPq1hyTpBTNDGLHd90MjPIer2q3&_nc_ohc=KYgCwLhV0RIAX9w4KZb&_nc_ht=scontent.fsgn5-14.fna&oh=03_AdSWmdiDeVyoXZYBJBTUdhUh5q7j0OzgBpm9Y_BKuUtARA&oe=6582909E" width={40} height={40}/>
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle();
          NavMenuToggle();
          //  SideBarOverlay();
        }}
      >
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span><span className="line"></span><span className="line"></span>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="22" y="11" width="4" height="4" rx="2" fill="#2A353A" />
            <rect x="11" width="4" height="4" rx="2" fill="#2A353A" />
            <rect x="22" width="4" height="4" rx="2" fill="#2A353A" />
            <rect x="11" y="11" width="4" height="4" rx="2" fill="#2A353A" />
            <rect x="11" y="22" width="4" height="4" rx="2" fill="#2A353A" />
            <rect width="4" height="4" rx="2" fill="#2A353A" />
            <rect y="11" width="4" height="4" rx="2" fill="#2A353A" />
            <rect x="22" y="22" width="4" height="4" rx="2" fill="#2A353A" />
            <rect y="22" width="4" height="4" rx="2" fill="#2A353A" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
