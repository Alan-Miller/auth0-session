import React from 'react';
import Header from './Header'
import Settings from './Settings'
import axios from 'axios';

class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = { user: {} }
  }

  componentDidMount() {
    axios.get('/auth/me').then(user => { 
      console.log('user', user)
      if (user.data.username) this.setState({user: user.data});
      // if (!user.data.username) this.props.history.push('/login');
    });
  }

  render() {
    const { user } = this.state;
    
    return (
      <div className="Dashboard">
        <Header user={user} />
        <Settings />
      </div>
    )
  }
}

export default Dashboard;