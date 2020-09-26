let db;

export default class TodoService {
  constructor() {
    this.initializeDB();
  }

  initializeDB() {
    db = new Dexie("todoDB");

    db.version(1).stores({
      tasks: "++id,description,done",
    });

    db.on("populate", async () => {
      await db.tasks.bulkPut([
        { description: "Learn Javascript", done: true },
        { description: "Learn Typescript", done: true },
        { description: "Learn PWA", done: false },
        { description: "Learn Java", done: false },
      ]);
    });
  }

  getAll() {
    return db.tasks.toArray();
  }
}
