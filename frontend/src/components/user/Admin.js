import React from 'react';
import { connect } from 'react-redux';

function Admin({ user }) {
  if (user.roles && user.roles.includes('admin')) {
    return <div>Welcome Admin</div>;
  }

  return <div>You are not an admin</div>;
}

const mapStateToProps = state => {
  return {
    user: state.session.user
  };
};

export default connect(mapStateToProps, null)(Admin);
