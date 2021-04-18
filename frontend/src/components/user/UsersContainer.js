import React, { useEffect, useState } from 'react';
import Users from '../user/Users';
import { getUsers } from '../../util/users_api_util';
import { getArticlesByUser } from '../../util/article_api_util';
import withLoadingSpinner from '../shared/withLoadingSpinner';

// I am using the original Users component as the argument
const UsersWithLoadingSpinner = withLoadingSpinner(Users);

function UsersContainer() {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    // this function was in Users but moved here
    // Users is now just for presentation
    async function fetchData() {
      try {
        const usersFromApi = await getUsers();
        for (const user of usersFromApi) {
          console.log(user);
          const articles = await getArticlesByUser(user._id);
          user.articles = articles;
          console.log(articles);
        }
        console.log(usersFromApi);
        setUsers(usersFromApi);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // returning a component, the props is how the component gets the data
  return <UsersWithLoadingSpinner data={users} />;
}

export default UsersContainer;
