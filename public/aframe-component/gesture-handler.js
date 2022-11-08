/* global AFRAME */
// link reference: https://github.com/fcor/arjs-gestures

AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 },
    minScale: { default: 0.005 },
    maxScale: { default: 0.01 },
    locationBased: { default: false },
    rotate: { default: false },
    scale: { default: false },
    drag: { default: false },
  },

  init: function () {
    this.handleScale = this.handleScale.bind(this);
    this.handleRotation = this.handleRotation.bind(this);
    this.handleDrag = this.handleDrag.bind(this);

    this.isVisible = this.data.locationBased;
    this.scaleFactor = 1;
    this.initialScale = null;

    this.el.sceneEl.addEventListener("targetFound", (e) => {
      this.initialScale = e.target.children[0].object3D.scale.clone();
      this.isVisible = true;
    });

    this.el.sceneEl.addEventListener("targetLost", (e) => {
      this.initialScale = null;
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
      this.el.sceneEl.removeEventListener("onefingermove", this.handleDrag);
      this.isVisible = false;
    });
  },

  update: function () {
    if (!this.data.enabled) {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
      this.el.sceneEl.removeEventListener("onefingermove", this.handleDrag);
      return;
    }

    if (this.data.rotate) {
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
      this.el.sceneEl.removeEventListener("onefingermove", this.handleDrag);
      this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
    } else if (this.data.scale) {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("onefingermove", this.handleDrag);
      this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
    } else if (this.data.drag) {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
      this.el.sceneEl.addEventListener("onefingermove", this.handleDrag);
    }
  },

  remove: function () {
    this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
    this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    this.el.sceneEl.removeEventListener("onefingermove", this.handleDrag);
  },

  handleRotation: function (event) {
    if (this.isVisible) {
      this.el.object3D.rotation.y +=
        event.detail.positionChange.x * this.data.rotationFactor;
      this.el.object3D.rotation.x +=
        event.detail.positionChange.y * this.data.rotationFactor;
    } else {
      this.remove();
    }
  },

  handleScale: function (event) {
    if (this.isVisible) {
      this.scaleFactor *=
        1 + event.detail.spreadChange / event.detail.startSpread;

      this.scaleFactor = Math.min(
        Math.max(this.scaleFactor, this.data.minScale),
        this.data.maxScale
      );

      this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
      this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
      this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
    } else {
      this.remove();
    }
  },

  handleDrag: function (event) {
    if (this.isVisible) {
      this.el.object3D.position.x += event.detail.positionChange.x;
      this.el.object3D.position.y -= event.detail.positionChange.y;
    } else {
      this.remove();
    }
  },
});
