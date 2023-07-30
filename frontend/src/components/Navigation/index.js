import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navigation-ul'>
      <li className='home'>
        <NavLink id='home-link' exact to="/">{
          <>
            <img id='logo' src="https://happybnb.s3.us-west-1.amazonaws.com/1690525771935.png" alt='pikachu' />
            <p>Happybnb</p>
          </>}
        </NavLink>

        <div className='my-links-section'>
          
          <div>Created by: Carmen Lee</div>
          <a id='github-atag' href="https://github.com/lee2278" target="_blank">
            <i className="fa-brands fa-github"></i>
          </a>
          <a id='linkedin-atag' href="https://www.linkedin.com/in/carmen-lee-52061690/" target="_blank">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
        
      </li>

      <div className='search-bar-component-container'>
        <SearchBar/>
      </div>
      <div className='group-right'>
        {sessionUser && (<li><NavLink id='create-spot-navlink' exact to='/spots/new'>Create a New Spot</NavLink></li>)}
        {isLoaded && (
          <li className='profile-btn'>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </div>
  );
}

export default Navigation;
