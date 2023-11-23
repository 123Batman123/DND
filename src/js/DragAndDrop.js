import MainElement from "./MainElement";

export default class DragAndDrop extends MainElement {
  constructor(element) {
    super(element);

    this.actualElement;
    this.nodes = [...this.element.querySelectorAll(".node")];

    this.allDraggable();

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.element.addEventListener("mousedown", this.onMouseDown);
  }

  onMouseDown(e) {
    if (!e.target.classList.contains("node")) return;

    e.preventDefault();

    this.actualElement = e.target;
    this.actualElement.classList.add("dragged");

    document.documentElement.addEventListener("mouseup", this.onMouseUp);
  }

  onMouseUp(e) {
    const mouseUpItem = e.target;
    let past = e.target.closest(".scroll");
    if (e.target.classList.contains("scroll")) {
      e.target.appendChild(this.actualElement);
    } else if (e.target.classList.contains("node")) {
      past.insertBefore(this.actualElement, mouseUpItem);
    }

    this.actualElement.classList.remove("dragged");
    this.actualElement = undefined;

    document.documentElement.removeEventListener("mouseup", this.onMouseUp);
  }

  allDraggable() {
    for (const node of this.nodes) {
      node.draggable = true;
    }
  }
}
