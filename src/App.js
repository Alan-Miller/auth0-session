import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      user: null,
      email: ''
    }
  }

  componentDidMount() {
    axios.get('/api/users').then(users => this.setState({ users: users.data }));
    axios.get('/auth/me').then(user => this.setState({ user: user.data }));
  }

  storeInput(email) {
    this.setState({ email })
  }

  poorMansLogin(e) {
    e.preventDefault();
    const { email } = this.state;
    console.log(email)
    axios.get(`/api/user/${email}`).then(user => this.setState({ user: user.data }));
  }

  render() {
    const userStyle = admin => admin ? { color: 'indianred' } : { color: 'cornflowerblue' };
    const { user } = this.state;

    return (
      <div className="main">
        <div className="currentUser">
          <h2>{user ? `Logged in as ${user.username}.` : 'Not logged in.'}</h2>
        </div>
        <div className="login">
          <h4>Log in</h4>
          <a href={process.env.REACT_APP_LOGIN}>
            <button className="loginButton">Log in with Auth0</button>
          </a>
          {/* <form className="loginForm" onSubmit={this.poorMansLogin.bind(this)}>
            <input type="text" onChange={e => this.storeInput(e.target.value)} />
            <input type="submit" style={{ display: 'none' }} />
          </form> */}
        </div>
        <div className="users">
          <h4>All users</h4>
          {this.state.users.map((user, i) => (
            <div className="user" key={i} style={userStyle(user.admin)}
            >{user.username} -- {user.email}</div>
          ))}
        </div>
      </div>
    )
  }
}