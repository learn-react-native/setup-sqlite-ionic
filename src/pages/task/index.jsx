import React, { useEffect, useState } from "react";
import { IonPage } from "@ionic/react";
import { useHistory } from "react-router";
import './styles.scss';
import TaskDB from '../../db/task.db';
import { formatDate } from '../../utils/helpers';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    const tasks = await TaskDB.listWith('users', 'user_id');
    setTasks(tasks.values);
  }, [])

  return (
    <IonPage>
      <div className="task-page">
        <div className="heading">Task Page</div>
        <button
          className="btn"
          onClick={() => {
            history.push('/')
          }
        }>
          Back List
        </button>
        <div className="content">
          <div className="list-task">
            {tasks.map(task => (
              <div
                className="task-item"
                key={task.id}
                onClick={() => {
                  history.push(`/task/${task.id}`)
                }}
              >
                <div className="task-id">{task.id}</div>
                <div className="task-name">{task.name}</div>
                <div className="task-created">{formatDate(task.created_at)}</div>
                <div className="user-infor">
                  <div>ID: {task.users[0].id}</div>
                  <div>name: {task.users[0].name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </IonPage>
  );
}

export default Task;