let db;

export default class TodoService {

  constructor() {
    this.initializeDB();
  }

  async initializeDB() {
    db = new Dexie('todoDB');

    db.version(1).stores({
      tasks: `++id,description,done`
    });

    db.on('populate', async () => {
      await db.tasks.bulkPut([
        { description: 'Learn JavaScript', done: true },
        { description: 'Learn TypeScript', done: false },
        { description: 'Learn PWA', done: false },
        { description: 'Learn HTML5 APIs', done: false },
      ]);
    });
  }

  async getList() {
    return db.tasks.toArray();
  }

  async get(id) {
    return db.tasks.get(id);
  }

  async save(task) {
    return db.tasks.put(task);
  }

  async delete(taskId) {
    return db.tasks.delete(taskId);
  }
}
