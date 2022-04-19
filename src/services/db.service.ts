import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { defineCustomElements as jeepSqlite, applyPolyfills  } from "jeep-sqlite/loader";
import jsonData from "../db/import-db";
import { Capacitor } from '@capacitor/core';

applyPolyfills().then( async () => {
  await jeepSqlite(window);
});

/** SQLite DB Singleton */
var DbConnection = function () {
  var db: any = null;
  var instance: number = 0;

  async function DbConnect2() {
    const platform = Capacitor.getPlatform();
    const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);

    try {
      if (platform === 'web') {
        console.log('SQLite running on web');
        const jeepEl = document.createElement("jeep-sqlite");
        document.body.appendChild(jeepEl);
        await customElements.whenDefined('jeep-sqlite');
        await sqlite.initWebStore();
      }
      const ret = await sqlite.checkConnectionsConsistency();
      const isConn = (await sqlite.isConnection("testdb")).result;
      var _db: SQLiteDBConnection;
      if (ret.result && isConn) {
        _db = await sqlite.retrieveConnection("testdb");
      } else {
        _db = await sqlite.createConnection("testdb", false, "no-encryption", 1);
        // await sqlite.saveToStore('testdb');
      }
      await sqlite.importFromJson(JSON.stringify(jsonData))
      await _db.open();
      return _db;
    } catch (err) {
      console.log(err);
    }
  }

  async function Get() {
    try {
      // this is just to count how many times our singleton is called.
      instance++;
      if (db !== null) {
        return db;
      } else {
        db = await DbConnect2();
        return db;
      }
    } catch (err) {
      return err;
    }
  }

  return {
    Get: Get
  }
}

export default DbConnection();
