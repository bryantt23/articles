import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

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
        <ul>
          <li>
            <Link to={'/articles'}>All Articles</Link>
          </li>
          <li>
            <Link to={'/add-article'}>Add an Article</Link>
          </li>
          <li>
            <a onClick={this.logoutUser}>Logout</a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>
            <Link to={'/signup'}>Signup</Link>
          </li>
          <li>
            <Link to={'/login'}>Login</Link>
          </li>
        </ul>
      );
    }
  }
  render() {
    return <div>{this.getLinks()}</div>;
  }
}

export default NavBar;
