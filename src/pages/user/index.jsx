import React, { useEffect, useState } from "react";
import { IonPage } from "@ionic/react";
import { useHistory } from "react-router";
import './styles.scss';
import UserDb from "../../db/user.db";
import { formatDate } from '../../utils/helpers';
const now = parseInt(new Date().getTime() / 1000);

const User = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  const createUser = async () => {
    let data = {
      name: 'new user ' + now,
      created_at: now
    };
    await UserDb.create(data);
  }

  const deleteUser = async (id) => {
    await UserDb.destroy(id);
    setUsers(users.filter(item => +item.id !== +id));
  }

  useEffect(async () => {
    const { values } = await UserDb.list();
    setUsers(values);
  }, []);

  return (
    <IonPage>
      <div className="user-page">
        <div className="heading">User Page</div>
        <button
          className="btn"
          onClick={() => {
            history.push('/')
          }
        }>
          Back List
        </button>
        <button
          className="btn"
          onClick={createUser}
        >
          Create
        </button>
        <div className="content">
          <div className="list-user">
            {users.map(user => (
              <div key={user.id}>
                <div
                  className="user-item"
                  key={user.id}
                  onClick={() => {
                    history.push(`user/${user.id}`)
                  }}
                >
                  <div className="user-id">ID: {user.id}</div>
                  <div className="user-name">Name: {user.name}</div>
                  <div className="user-created">Created at: {formatDate(user.created_at)}</div>
                </div>
                  <button
                  className="btn"
                  onClick={deleteUser.bind(this, user.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </IonPage>
  );
}

export default User;
