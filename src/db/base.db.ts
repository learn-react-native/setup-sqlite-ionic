import DbConnection from '../services/db.service';

interface Payload {
  table: string,
  fillable: any,
}

class BaseDB {
  table = '';
  fillable = [];
  constructor (payload: Payload) {
    this.table = payload.table;
    this.fillable = payload.fillable;
  }

  init():Promise<any> {
    return new Promise((resolve, reject) => {
      DbConnection.Get()
        .then(db => {
          resolve(db);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  async create(data: Object) {
    let db = await this.init();
    let field = this.fillable.filter((item: any) => item !== 'id');
    let query = `INSERT INTO ${this.table} (${field.join(',')}) VALUES(${Array.from(field, () => '?')})`;
    data = field.map((item:any, key) => {
      return data[field[key]];
    });
    return await db.run(query, data);
  }

  async update(id: any, data: Object) {
    let db = await this.init();
    let field = Object.keys(data).map((item: any) => {
      return `${item}=?`;
    });
    let query = `UPDATE ${this.table} SET ${field.join(', ')} WHERE id = ?;`;

    return db.query(
      query,
      [...Object.values(data), id + ""]
    );
  }

  async destroy(id: any) {
    let db = await this.init();
    return await db.query(`DELETE FROM ${this.table} WHERE id = ?;`, [
      id + "",
    ]);
  }

  async list() {
    let db = await this.init();
    return await db.query(`SELECT * from ${this.table}`);
  }

  async listWith(table: string, foreign_key: any) {
    return new Promise(async (resolve, reject) => {
      let db = await this.init();
      let fieldGet = [];
      fieldGet = this.fillable.map((item: any) => {
        return `${this.table}.${item} as ${this.table}__${item}`;
      });
      const query = `
        SELECT ${fieldGet.join(',')}, ${table}.*
        FROM ${this.table}
        JOIN ${table} ON ${table}.id = ${this.table}.${foreign_key}
      `;
      let { values } = await db.query(query);
      console.log(values);
      values = values.map((item: object) => {
        let related:any = {
          [table]: []
        };
        let newItem:any = {};
        for (const [key, value] of Object.entries(item)) {
          let arr = key.split(`${this.table}__`);

          if (arr.length === 2) {
            related[arr[1]] = value;
          }
          if (arr.length === 1) {
            newItem[arr[0]] = value;
          }
        }
        related[table].push(newItem);
        return related;
      });
      resolve({ values });
    });
  }

  async get(id: any) {
    let db = await this.init();
    return await db.query(`SELECT * FROM ${this.table} WHERE id = ?;`, [
      id + "",
    ]);
  }

  async getWith() {
  }

  async hasOne() {

  }

  async hasMany(id: any, table: string, foreign_key: any) {
    let db = await this.init();
    const query = `SELECT ${table}.* FROM ${this.table} JOIN ${table} ON ${table}.${foreign_key} = ${this.table}.id WHERE ${this.table}.id = ${id}`;
    return await db.query(query);
  }

  async belongsTo() {

  }
}

export { BaseDB as default };
