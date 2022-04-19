import BaseDb from './base.db';

class TaskDB extends BaseDb {
  constructor () {
    super({
      table: 'tasks',
      fillable: ['id', 'name', 'user_id', 'created_at'],
    });
  }
}

export default new TaskDB;
