
const db = new Dexie('todoDB');
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

async function start() {
  db.tasks.each(item => console.log(item));
  let task1 = await db.tasks.get(1);
  task1.done = true;
  task1.description = 'another description';
  await db.tasks.put(task1);
  db.tasks.delete(4);
}

start();
