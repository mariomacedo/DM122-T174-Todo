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
    form.addEventListener('submit', event => {
      event.preventDefault();
      console.log(form.item.value);
      form.reset();
    });
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

  addToHtmlList(item) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');

    li.setAttribute('data-item-id', item.id);
    li.addEventListener('click', () => this.toggleTask(li));
    span.textContent = item.description;

    button.textContent = 'x';
    // button.addEventListener('click', HtmlService.buttonHandler)

    if (item.done) {
      li.classList.add('done');
    }

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
  }

}
