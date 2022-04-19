import React, { useEffect, useReducer, useState } from "react";
import { IonPage, IonItem, IonInput } from "@ionic/react";
import { useHistory, useParams } from "react-router";
import UserDB from '../../db/user.db';
const UPDATE_USER = 'UPDATE_USER';

const UserDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);
  const [tasksByUser, setTasksByUser] = useState([]);
  const [name, setName] = useState('');

  useEffect(async () => {
    if (id) {
      const userItem = await UserDB.get(id);
      const tasks = await UserDB.tasks(id);
      setTasksByUser(tasks.values);
      setCurrentUser(userItem.values[0]);
      setName(currentUser.name);
    }
  }, [id]);

  const updateUser = async () => {
    await UserDB.update(id, { name });
  }

  return (
    <IonPage>
      <div className="user-detail-page">
        <div>
          <div className="heading">User Detail</div>
          <button
            className="btn"
            onClick={() => {
              history.push('/user')
            }
          }>
            Back List
          </button>
          <button
            className="btn"
            onClick={updateUser}
          >
            Update
          </button>
          {currentUser && (
            <div className="content">
              <div className="info user-item">
                <div className="user-id">ID: {currentUser.id}</div>
                <IonItem>
                  <IonInput
                    type="text"
                    value={name}
                    onIonChange={e => setName(e.target.value)}
                  ></IonInput>
                </IonItem>
                <div className="user-created">Created at: {currentUser.created_at}</div>
              </div>
              <div className="todo">
                <h1>Task List</h1>
                {tasksByUser.length ? tasksByUser.map(task => (
                  <div
                    className="task-item"
                    key={task.id}
                  >
                    {task.name}
                  </div>
                )) : (
                  <div>Task is empty!</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </IonPage>
  );
}

export default UserDetail;
