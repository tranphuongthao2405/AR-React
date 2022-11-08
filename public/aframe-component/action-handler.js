/* global AFRAME */

const EVENT_TYPE = {
  rotate: 1,
  scale: 2,
  drag: 3,
};

AFRAME.registerComponent("action-handler", {
  init: function () {
    this.selectedModel = null;

    this.el.sceneEl.addEventListener("targetFound", (event) => {
      this.selectedModel = event.target.children[0];
    });

    this.el.sceneEl.addEventListener("targetLost", () => {
      this.selectedModel = null;
    });

    this.updateUI();
  },

  updateUI() {
    const sceneEl = document.getElementsByClassName("container");
    const buttonContainer = document.createElement("div");

    const rotateButton = document.createElement("button");
    rotateButton.textContent = "Rotate";
    rotateButton.onclick = () => this.buttonEventHandler(EVENT_TYPE.rotate);

    const scaleButton = document.createElement("button");
    scaleButton.textContent = "Zoom";
    scaleButton.onclick = () => this.buttonEventHandler(EVENT_TYPE.scale);

    const dragButton = document.createElement("button");
    dragButton.textContent = "Drag";
    dragButton.onclick = () => this.buttonEventHandler(EVENT_TYPE.drag);

    buttonContainer.style =
      "position: absolute; top: 10px; right: 10px; display: flex; gap: 5px";
    buttonContainer.append(rotateButton, scaleButton, dragButton);

    sceneEl[0].append(buttonContainer);
  },

  buttonEventHandler(type) {
    if (!this.selectedModel) return;

    let newAttribute = {};
    if (type === EVENT_TYPE.rotate) {
      newAttribute = {
        rotate: true,
        scale: false,
        drag: false,
      };
    } else if (type === EVENT_TYPE.scale) {
      newAttribute = {
        rotate: false,
        scale: true,
        drag: false,
      };
    } else if (type === EVENT_TYPE.drag) {
      newAttribute = {
        rotate: false,
        scale: false,
        drag: true,
      };
    }

    const elAttribute = this.selectedModel.getAttribute("gesture-handler");
    this.selectedModel.setAttribute("gesture-handler", {
      ...elAttribute,
      ...newAttribute,
    });
  },
});
