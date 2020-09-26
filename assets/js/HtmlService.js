export default class HtmlService {
  constructor() {
    console.log("html service instantiated");
    this.bindFormEvent();
  }

  bindFormEvent() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log(form.item.value);
      form.reset();
    });
  }
}
