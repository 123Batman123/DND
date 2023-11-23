export default class MainElement {
  constructor(element) {
    if (typeof element === "string") {
      this.element = document.querySelector(element);
    }
  }
}
