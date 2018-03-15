import React from 'react';

export default function Header(props) {
  const { user } = props;

  return (
    <div className="Header">
      <div className="banner">
        <h2 className="heading">{user ? `${user.username}'s ` : null}Dashboard</h2>
        <a href={process.env.REACT_APP_LOGOUT}>
          <button className="logout">Log out</button>
        </a>
      </div>
    </div>
  )
}