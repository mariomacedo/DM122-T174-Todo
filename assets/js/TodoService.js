const db = new Dexie("todoDB");

db.version(1).stores({
  tasks: "++id,description,done",
});

console.log("here");
db.on("populate", async () => {
  await db.tasks.bulkPut([
    { description: "Learn Javascript", done: false },
    { description: "Learn Typescript", done: false },
    { description: "Learn PWA", done: false },
    { description: "Learn Java", done: false },
  ]);
});

async function list() {
  await db.tasks.each((task) => console.log(task));
  const taskTypeScript = await db.tasks.get(2);
  taskTypeScript.done = true;
  db.tasks.put(taskTypeScript);
  const tasksDone = await db.tasks
    .where("description")
    .equals("Learn Java")
    .first();
  console.log("Result", tasksDone);
}

list();
