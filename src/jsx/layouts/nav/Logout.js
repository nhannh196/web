import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';

import { Logout } from '../../../store/actions/AuthActions';
import { isAuthenticated } from '../../../store/selectors/AuthSelectors';
import { useState } from 'react';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

function LogoutPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLogout(e) {
    // e.preventDefault();
    // dispatch(loadingToggleAction(false));
    const navigateLogoutSuccess = document.getElementById('logout-success')
    // localStorage.removeItem('userDetails');
    // localStorage.removeItem('accessToken');
    // navigateLogoutSuccess.click();
     dispatch(Logout(navigate));      
    // window.location.href = `/login`
    // window.location.reload()
  }

  console.log(window.location)

  return (
    <>
      <button className="dropdown-item ai-icon" onClick={() => onLogout()}>
        <svg
          id="icon-logout" xmlns="http://www.w3.org/2000/svg"
          className="text-danger me-1" width={18} height={18} viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" fillRule="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1={21} y1={12} x2={9} y2={12} />
        </svg>
        <Link to="/login" id="logout-success"></Link>
        <span className="ms-2" >Logout </span>
      </button>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

// export default withRouter(connect(mapStateToProps)(LogoutPage));
export default LogoutPage;