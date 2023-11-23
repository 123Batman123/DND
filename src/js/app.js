import ButtonControl from "./ButtonControl";
import DragAndDrop from "./DragAndDrop";
import CreateDOM from "./CreateDOM";

function start(selector) {
  new ButtonControl(selector);
  new DragAndDrop(selector);
  const dom = new CreateDOM(selector);

  dom.drawingDOM();

  window.addEventListener("beforeunload", () => {
    dom.saveDOM();
  });
}

start("main");
