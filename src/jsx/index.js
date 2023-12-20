import React, { useContext, useState, useEffect } from "react";

/// React router dom
import { Routes, Route, Outlet } from "react-router-dom";
//
/// Layout
import Nav from "./layouts/nav";
import Nav2 from "./layouts/nav/index2";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";
import Main from './layouts/Main';
import WalletBar from './layouts/WalletBar';

/// Dashboard
import Home from "./components/UserDeafault/HomeDefault/Home";

import Contact from "./components/Dashboard/Contact";


//Course
import Forum from "./components/UserDeafault/ForumDefault/Forum";

/// Pages

// import LockScreen from "./pages/LockScreen";
// import Error400 from "./pages/Error400";
// import Error403 from "./pages/Error403";
// import Error404 from "./pages/Error404";
// import Error500 from "./pages/Error500";
// import Error503 from "./pages/Error503";
import Login from "./pages/Login";
import Registration from "./components/RegistrationComponents/Registration";

import { ThemeContext } from "../context/ThemeContext";
import { isLogin } from "../services/AuthService";

import PostNew from "./components/UserAuthenticated/PostNew/PostNew";
import ApexChart from "./components/charts/apexcharts";
import ListUsers from "./components/AdminComponents/ListUsers/ListUsers";
import ListManagers from "./components/AdminComponents/ListManagers/ListManagers";
import CheckOtp from "./components/CheckOtpComponents/CheckOtp";
import PortfolioOptimization from "./components/UserAuthenticated/PortfolioOptimization/PortfolioOptimization";
import { getUserDetails, userLocalStorage } from "../services/AuthService";
import ManageMyPosts from "./components/UserAuthenticated/ManageMyPost/ManageMyPosts";
const Markup = () => {
  let routesDefault = [
    { url: "/", component: <Home /> },
    { url: "/home", component: <Home /> },
    // { url: "contact", component: <Contact /> },
    // { url: "login", component: <Login /> },
    // { url: "register", component: <Registration /> },
    { url: "forum", component: <Forum /> },
    { url: "check-otp", component: <CheckOtp /> },
  ];


  const [allRoutes, setAllRoutes] = useState(routesDefault);

  const routeAuthor = (role) => {
    //Un Authentication
    if (role === null || role === undefined) {
      setAllRoutes(routesDefault)
    }
    //Users
    if (role === 2) {
      let routes = [
        { url: "post-new", component: <PostNew /> },
        { url: "chart-apexchart", component: <ApexChart /> },
        { url: "portfolio-optimization", component: <PortfolioOptimization /> },
        { url: "manage-my-posts", component: <ManageMyPosts /> },

      ]
      setAllRoutes([...routesDefault, ...routes])
    }

    //Admin
    if (role === 1) {
      let routes = [
        { url: "list-users", component: <ListUsers /> },
        { url: "list-managers", component: <ListManagers /> },
      ]
      setAllRoutes([...routesDefault, ...routes])
    }
  }
  const user = JSON.parse(localStorage.getItem('userDetails'))
  const [userDetails, setUserDetails] = useState(user)
  const accessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    if (accessToken === undefined || accessToken === null) {
      console.log('chua dang nhap')
      setAllRoutes(routesDefault)
    } else {
      console.log('da dang nhap')
      routeAuthor(userDetails.roleId)
    }
  }, [])

  return (
    <>
      <Routes>
        {!isLogin() &&
          <Route element={<Layout1 />}>
            <Route path='/login' exact element={<Login />} />
            <Route path='/register' exact element={<Registration />} />
          </Route>
        }
        <Route element={<Layout7 />}>
          {allRoutes.map((data, i) => (
            <Route key={i} exact path={`/${data.url}`} element={data.component} />
          ))}
        </Route>
      </Routes>
      {/* <Setting /> */}
      <ScrollToTop />
    </>
  );
};

function Layout1() {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return (
    <div id="main-wrapper" className={`wallet-open active show ${sidebariconHover ? "iconhover-toggle" : ""} ${menuToggle ? "menu-toggle" : ""}`}>
      <Nav />
      <div className="content-body" style={{ minHeight: window.screen.height + 20 }}>
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      {/* <WalletBar /> */}
      {/* <div className="wallet-bar-close"></div> */}
    </div>

  )
}

function Layout2() {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return (
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${menuToggle ? "menu-toggle" : ""}`}>
      <Nav />
      <div className="content-body" style={{ minHeight: window.screen.height + 20 }}>
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      {/* <Footer changeFooter="out-footer" /> */}
    </div>

  )
}

function Layout3() {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return (
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${menuToggle ? "menu-toggle" : ""}`}>
      <Nav />
      <div className="content-body" style={{ minHeight: window.screen.height + 20 }}>
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

function Layout4() {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return (
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${menuToggle ? "menu-toggle" : ""}`}>
      <Nav />
      <div className="content-body">
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

function Layout5() {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return (
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${menuToggle ? "menu-toggle" : ""}`}>
      <Nav />
      <div className="content-body message-body mh-auto">
        <div className="container-fluid mh-auto p-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
function Layout6() {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return (
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${menuToggle ? "menu-toggle" : ""}`}>
      <Nav />
      <div className="content-body">
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

function Layout7() {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return (
    <div id="main-wrapper" className={`wallet-open active show ${sidebariconHover ? "iconhover-toggle" : ""} ${menuToggle ? "menu-toggle" : ""}`}>
      <Nav />
      <div className="content-body" style={{ minHeight: window.screen.height + 20 }}>
        <div className="container-fluid">


          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Markup;