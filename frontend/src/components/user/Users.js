import React, { useEffect, useState } from 'react';
import { getUsers } from '../../util/users_api_util';
import { getArticlesByUser } from '../../util/article_api_util';
import User from '../user/User';
import ArticlePreviewMini from '../article/ArticlePreviewMini';

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
                <User handle={user.handle} email={user.email} />
                <div>
                  {user.articles.length === 0 ? (
                    'There are no articles by this user'
                  ) : (
                    <div>
                      User has the following articles:
                      {user.articles.map(article => {
                        return (
                          <div
                            key={article._id}
                            style={{ border: '1px solid', marginLeft: '20px' }}
                          >
                            <ArticlePreviewMini article={article} />
                          </div>
                        );
                      })}
                    </div>
                  )}
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
