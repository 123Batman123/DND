import MainElement from "./MainElement";
import LocalStorageDND from "./LocalStorageDND";

export default class CreateDOM extends MainElement {
  constructor(element) {
    super(element);
    this.allScroll = [...this.element.querySelectorAll(".scroll")];
    this.storage = new LocalStorageDND();
  }

  static createDivNode(text) {
    const div = document.createElement("div");
    div.classList = "node";

    const divClose = document.createElement("div");
    divClose.classList = "close";

    div.textContent = text;

    div.appendChild(divClose);

    return div;
  }

  saveDOM() {
    const object = { TODO: [], "IN PROGRESS": [], DONE: [] };
    for (const scroll of this.allScroll) {
      const nameColumn = scroll
        .closest(".column")
        .querySelector(".main-header").textContent;
      const allNode = [...scroll.querySelectorAll(".node")];

      for (const node of allNode) {
        object[nameColumn].push(node.textContent);
      }
    }

    this.storage.local = object;
  }

  drawingDOM() {
    if (window.localStorage.getItem("DOM")) {
      for (const scroll of this.allScroll) {
        this.storage.local[scroll.getAttribute("name")].forEach((e) => {
          scroll.appendChild(CreateDOM.createDivNode(e));
        });
      }
    }
  }

  static proection(node) {
    const div = document.createElement("div");
    div.classList.add("proection");
    const { width, height } = window.getComputedStyle(node);
    div.style.cssText = `
	 			width: ${width};
		 		height: ${height};
		 		margin: 10px 0;
			`;
    return div;
  }
}
