import React, { useEffect, useState } from 'react';
import { getUsers } from '../../util/users_api_util';
import User from '../user/User';

function Users() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersFromApi = await getUsers();
        setUsers(usersFromApi);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {!users ? (
        `There are no users`
      ) : (
        <div>
          <h1>Users</h1>
          {users.map(user => {
            return (
              <User key={user._id} handle={user.handle} email={user.email} />
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Users;
