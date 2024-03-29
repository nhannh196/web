/// Menu
// import Metismenu from "metismenujs";
import React, { useReducer, useContext, useEffect, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import { Collapse } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Menu } from './Menu';
import { MenuUser } from './MenuUser';
import { MenuManage } from './MenuManage';
import { MenuAdmin } from './MenuAdmin';
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import { isLogin } from "../../../services/AuthService";
import { getUserDetails } from "../../../services/AuthService";


const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "",
  activeSubmenu: "",
}

const SideBar = () => {


  let d = new Date();
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
    ChangeIconSidebar,
  } = useContext(ThemeContext);

  const [state, setState] = useReducer(reducer, initialState);
  const [menuList, setMenuList] = useState([])
  // useEffect(() => {
  //   var btn = document.querySelector(".nav-control");
  //   var aaa = document.querySelector("#main-wrapper");
  //   function toggleFunc() {
  //     return aaa.classList.toggle("menu-toggle");
  //   }
  //   btn.addEventListener("click", toggleFunc);
  // }, []);

  let handleheartBlast = document.querySelector('.heart');
  function heartBlast() {
    return handleheartBlast.classList.toggle("heart-blast");
  }

  const [hideOnScroll, setHideOnScroll] = useState(true)
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll]
  )


  const handleMenuActive = status => {
    setState({ active: status });
    if (state.active === status) {
      setState({ active: "" });
    }
  }
  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status })
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" })
    }
  }
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  //get user details
  const [userDetails, setUserDetails] = useState('')
  useEffect(() => {
    const getUserDetailsData = async () => {
      try {
        let respone = await getUserDetails();
        setUserDetails(respone.data)
      } catch (error) {
        console.log(error)
      }
    }
    if (isLogin()) {
      getUserDetailsData()
    }
  }, [])

  useEffect(() => {
    if (isLogin()) {
      let roleId = userDetails.roleId
      if (roleId === 1) {
        setMenuList(MenuAdmin)
      } else if (roleId === 2 || roleId === null) {
        setMenuList(MenuUser)
      } else if (roleId === 3) {
        setMenuList(MenuManage)
      }
    } else {
      setMenuList(Menu)
    }
  }, [userDetails])
  // console.log(menuList)
  // console.log(state)
  // console.log(path)
  useEffect(() => {
    if (path === '') {
      setState({ active: "Home" })
      return
    } else {
      menuList.map((data) => {
        if (data.to === path) {
          setState({ active: data.title })
          return
        } else {
          if (data.content?.length > 0) {
            data.content.map((content) => {
              if (content.to === path) {
                setState({ active: data.title, activeSubmenu: content.title})
                return
              }
            })
          }
        }
      })
    }

  }, [menuList, path])
  // console.log('123')
  // let MenuList = getMenu();
  // console.log(MenuList)
  // console.log(path)
  // console.log(menuList)
  return (
    <div
      onMouseEnter={() => ChangeIconSidebar(true)}
      onMouseLeave={() => ChangeIconSidebar(false)}
      className={`dlabnav ${iconHover} ${sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
        ? hideOnScroll > 120
          ? "fixed"
          : ""
        : ""
        }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <ul className="metismenu" id="menu">
          {menuList.map((data, index) => {
            let menuClass = data.classsChange;
            if (menuClass === "menu-title") {
              return (
                <li className={menuClass} key={index}>{data.title}</li>
              )
            } else {
              return (
                <li className={`${state.active === data.title ? 'mm-active' : ''}`}
                  key={index}
                >
                  {data.content && data.content.length > 0 ?
                    <>
                      <Link to={"#"}
                        className="has-arrow"
                        onClick={() => { handleMenuActive(data.title) }}
                      >
                        {data.iconStyle}
                        <span className="nav-text">{data.title}</span>
                        <span className="ms-1 badge badge-xs style-1 badge-danger">{data.update}</span>
                      </Link>
                      <Collapse in={state.active === data.title ? true : false}>
                        <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                          {data.content && data.content.map((data, index) => {
                            return (
                              <li key={index}
                                className={`${state.activeSubmenu === data.title ? "mm-active" : ""}`}
                              >
                              
                                  <>
                                    <Link to={data.to} className={`${state.activeSubmenu === data.title ? "mm-active" : ""}`}
                                      onClick={() => { handleSubmenuActive(data.title) }}
                                    >
                                      {data.title}
                                    </Link>
                                    {/* <Collapse in={state.activeSubmenu === data.title ? true : false}>
                                      <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                        {data.content && data.content.map((data, index) => {
                                          return (

                                            <li key={index}>
                                              <Link className={`${path === data.to ? "mm-active" : ""}`} to={data.to}>{data.title}</Link>
                                            </li>

                                          )
                                        })}
                                      </ul>
                                    </Collapse> */}
                                  </>
                                 
                              </li>
                            )
                          })}
                        </ul>
                      </Collapse>
                    </>
                    :
                    
                    <Link to={data.to}
                      onClick={() => { handleMenuActive(data.title) }}
                    >
                      {data.iconStyle}
                      <span className="nav-text">{data.title}</span>
                      <span className="ms-1 badge badge-xs style-1 badge-danger">{data.update}</span>
                    </Link>
                  }

                </li>
              )
            }
          })}
        </ul>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
