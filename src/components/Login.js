import React from 'react';
import axios from 'axios';

class Login extends React.Component {

  componentDidMount() {
    axios.get('/auth/me').then(user => {
      if (user.data.username) this.props.history.push('/dashboard');
    });
  }


  render() {
    return (
      <div className="Login">

        <div className="loginForm">
          <a href={process.env.REACT_APP_LOGIN}>
            <button className="loginButton">Log in with Auth0</button>
          </a>
        </div>

      </div>
    )
  }
}

export default Login;

