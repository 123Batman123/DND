import MainElement from "./MainElement";
import CreateDOM from "./CreateDOM";

export default class ButtonControl extends MainElement {
  constructor(element) {
    super(element);

    this.allButtonHandler = this.allButtonHandler.bind(this);

    this.element.addEventListener("click", this.allButtonHandler);
  }

  allButtonHandler(e) {
    if (e.target.classList.contains("close")) {
      e.target.closest(".node").remove();
    }

    if (e.target.classList.contains("add")) {
      e.target.style.display = "none";
      e.target
        .closest(".column")
        .querySelector(".add-conteiner").style.display = "flex";
      e.target.closest(".column").querySelector(".save").style.display = "flex";
    }

    if (e.target.classList.contains("close-button")) {
      this.hideWindowAndViewAdd(e.target);
    }

    if (e.target.classList.contains("save-button")) {
      const add = e.target
        .closest(".column")
        .querySelector(".add-conteiner").textContent;

      if (add.trim("") === "") return;

      const scroll = e.target.closest(".column").querySelector(".scroll");

      scroll.appendChild(CreateDOM.createDivNode(add));

      e.target.closest(".column").querySelector(".add-conteiner").textContent =
        "";

      this.hideWindowAndViewAdd(e.target);
    }
  }

  hideWindowAndViewAdd(target) {
    target.closest(".column").querySelector(".add-conteiner").style.display =
      "none";
    target.closest(".column").querySelector(".save").style.display = "none";
    target.closest(".column").querySelector(".add").style.display = "flex";
  }
}
