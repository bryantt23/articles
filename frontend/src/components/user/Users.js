import React, { useEffect, useState } from 'react';
import { getUsers } from '../../util/users_api_util';
import { getArticlesByUser } from '../../util/article_api_util';
import User from '../user/User';
import ArticlePreviewContainer from '../article/ArticlePreviewContainer';

function Users() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
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

  return (
    <div>
      {!users ? (
        `There are no users`
      ) : (
        <div>
          <h1>Users</h1>
          {users.map(user => {
            return (
              <div key={user._id}>
                {/* {JSON.stringify(user.articles)} */}
                <User handle={user.handle} email={user.email} />
                <div>
                  {user.articles.length === 0
                    ? 'There are no articles by this user'
                    : JSON.stringify(user.articles)}
                </div>{' '}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Users;
