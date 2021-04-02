import React from 'react';

function User({ handle, email }) {
  return (
    <div>
      <h3>User Handle: {handle}</h3>
      <p>User Email: {email}</p>
    </div>
  );
}

export default User;
