import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='navigation-ul'>
      <li className='home'>
        <NavLink id='home-link' exact to="/">Happybnb</NavLink>
      </li>
      {sessionUser && (<li><NavLink exact to='/spots/new'>Create a New Spot</NavLink></li>)}
      {isLoaded && (
        <li className='profile-btn'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
