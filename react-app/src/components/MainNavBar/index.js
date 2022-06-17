import './MainNavBar.css'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import githubLogo from '../../images/github.svg';

const NavBar = () => {
  const currentUser = useSelector((state) => state.session.user);
  const initial = currentUser?.username[0].toUpperCase()

  const [profileDisplay, setProfileDisplay] = useState(false)

  const toggleProfileDisplay = (e) => {
    e.preventDefault();
    if (profileDisplay === true) {
      setProfileDisplay(false)
    } else {
      setProfileDisplay(true)
    }
  }
  
  let sessionLinks;
  if (currentUser) {
    sessionLinks = (
      <>
        <li className='navbar-link navbar-new-gig'>
          <NavLink to='/gigs/new' exact={true} className='navbar-new-gig-link'>
            New Gig
          </NavLink>
        </li>
        <li className='navbar-link orders-link'>
          <NavLink to={`/users/${currentUser.id}`} exact={true} className='navbar-new-gig-link'>
            My Orders
          </NavLink>
        </li>
        <li className='navbar-link navbar-profile'>
          <div className='profile-link' onClick={toggleProfileDisplay}>
            <span className='username-initial'>{initial}</span>
          </div>
          {profileDisplay && (
            <LogoutButton />
          )}
        </li>
      </>
    )
  } else {
    sessionLinks = (
      <>
        <li className='navbar-link navbar-login'>
          <NavLink to='/login' exact={true}>
            Sign In
          </NavLink>
        </li>
        <li className='navbar-link signup-li'>
          <NavLink to='/sign-up' exact={true}>
            <button className='signup-btn'>
              Join
            </button>
          </NavLink>
        </li>
      </>
    )
  }

  return (
    <nav className='main-nav-wrapper'>
      <ul className='header-row'>
        <li className='navbar-link'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <span className='header-logo'>nerdrr</span>
            <span className='header-logo-end'>.</span>
          </NavLink>
        </li>
        <li className='navbar-link'>
          <a
            href='https://github.com/Amlovern'
            target='_blank'
            rel='noreferrer'
          >
            <img src={githubLogo} height='20px' alt='github' />
          </a>
        </li>
        <div className='session-link-wrapper'>
          {sessionLinks}
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
