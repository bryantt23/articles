import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './navbar.css'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLink = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Link to={'/articles'}>All Articles</Link>
          {/* <Link to={'/profile'}>Profile</Link> */}
          <Link to={'/add-article'}>Add an Article</Link>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <h1>Articles</h1>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
