export default class LocalStorageDND {
  #local = window.localStorage;
  get local() {
    return JSON.parse(this.#local.getItem("DOM"));
  }

  set local(obj) {
    this.#local.setItem("DOM", JSON.stringify(obj));
  }

  clearStorage() {
    this.#local.clear();
  }
}
