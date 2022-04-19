import DaseDb from './base.db';

class UserDB extends DaseDb {
  constructor () {
    super({
      table: 'users',
      fillable: ['id', 'name', 'created_at']
    });
  }
  async tasks(id: string) {
    return this.hasMany(id, 'tasks', 'user_id');
  }
}

export default new UserDB;
