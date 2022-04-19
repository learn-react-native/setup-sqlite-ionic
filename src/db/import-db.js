const now = parseInt(new Date().getTime() / 1000);

const dataImport = {
  database: "testdb",
  version: 1,
  encrypted: false,
  mode: "full",
  tables: [
    {
      name: "users",
      schema: [
        { column: "id", value: "INTEGER PRIMARY KEY NOT NULL" },
        { column: "name", value: "TEXT NOT NULL" },
        { column: "created_at", value: "INTEGER DEFAULT (strftime('%s', 'now'))" }
      ],
      values: [
        [1, "user demo 1a", now],
        [2, "user demo 2a", now],
        [3, "user demo 3a", now],
      ]
    },
    {
      name: "tasks",
      schema: [
        { column: "id", value: "INTEGER PRIMARY KEY NOT NULL" },
        { column: "name", value: "TEXT NOT NULL" },
        { column: "user_id", value: "INTEGER" },
        { column: "created_at", value: "INTEGER DEFAULT (strftime('%s', 'now'))" },
        { foreignkey: "user_id", value: "REFERENCES users (id) ON DELETE SET NULL" }
      ],
      values: [
        [1, "Task 1", 1, now],
        [2, "Task 2", 1, now],
        [3, "Task 3", 1, now],
        [4, "Task 4", 2, now],
      ]
    },
  ]
}

export default dataImport;
