import MainElement from "./MainElement";
import CreateDOM from "./CreateDOM";

export default class DragAndDrop extends MainElement {
  constructor(element) {
    super(element);
    this.draggingElement = null;

    this.actualElement;
    this.nodes = [...this.element.querySelectorAll(".node")];

    // this.allDraggable();

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.element.addEventListener("mousedown", this.onMouseDown);
  }

  onMouseMove(e) {
    let past = e.target.closest(".scroll");
    this.actualElement.style.top = e.pageY - this.shiftY + "px";
    this.actualElement.style.left = e.pageX - this.shiftX + "px";

    if (e.target.classList.contains("scroll")) {
      e.target.appendChild(this.draggingElement);
    } else if (e.target.classList.contains("node")) {
      past.insertBefore(this.draggingElement, e.target);
    }
  }

  onMouseDown(e) {
    if (!e.target.classList.contains("node")) return;

    e.preventDefault();
    this.actualElement = e.target;

    this.shiftY = e.clientY - this.actualElement.getBoundingClientRect().top;
    this.shiftX = e.clientX - this.actualElement.getBoundingClientRect().left;

    this.draggingElement = CreateDOM.proection(e.target);

    this.actualElement.classList.add("dragged");

    document.documentElement.addEventListener("mouseup", this.onMouseUp);
    document.documentElement.addEventListener("mousemove", this.onMouseMove);
  }

  onMouseUp() {
    this.changeElementAndStyle();

    this.сleaningUpIntermediateData();

    document.documentElement.removeEventListener("mouseup", this.onMouseUp);
    document.documentElement.removeEventListener("mousemove", this.onMouseMove);
  }

  allDraggable() {
    for (const node of this.nodes) {
      node.draggable = true;
    }
  }

  changeElementAndStyle() {
    this.draggingElement.replaceWith(this.actualElement);
    this.actualElement.style = this.draggingElement.style;
  }

  сleaningUpIntermediateData() {
    this.actualElement.classList.remove("dragged");
    this.actualElement = undefined;
    this.draggingElement = undefined;
  }
}
