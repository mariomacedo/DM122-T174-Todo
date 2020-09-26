const form = document.querySelector('form');
const ul = document.querySelector('ul');
const DONE = 'done';

export default class HtmlService {

  constructor(todoService) {
    this.todoService = todoService;
    this.bindFormEvent();
    this.listTasks();
  }

  bindFormEvent() {
    form.addEventListener('submit', async event => {
      event.preventDefault();
      await this.addTask(form.item.value);
      form.reset();
    });
  }

  async addTask(description) {
    const task = { description, done: false };
    const taskId = await this.todoService.save(task);
    task.id = taskId;
    this.addToHtmlList(task);
  }

  async listTasks() {
    const tasks = await this.todoService.getList();
    tasks.forEach(task => this.addToHtmlList(task));
  }

  async saveTask(taskId, isDone) {
    const task = await this.todoService.get(taskId);
    task.done = isDone;
    this.todoService.save(task);
  }

  toggleTask(li) {
    const taskId = +li.getAttribute('data-item-id');
    li.classList.toggle(DONE);
    const isDone = li.classList.contains(DONE);
    this.saveTask(taskId, isDone);
  }

  async deleteTask(li) {
    const taskId = +li.getAttribute('data-item-id');
    await this.todoService.delete(taskId);
    this.removeFromHtmlList(taskId);
  }

  removeFromHtmlList(taskId) {
    const li = document.querySelector(`[data-item-id='${taskId}']`);
    ul.removeChild(li);
  }

  addToHtmlList(task) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');

    li.setAttribute('data-item-id', task.id);
    li.addEventListener('click', () => this.toggleTask(li));
    span.textContent = task.description;

    button.textContent = 'x';
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      this.deleteTask(li);
    });

    if (task.done) {
      li.classList.add(DONE);
    }

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
  }

}
