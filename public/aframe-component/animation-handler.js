/* global AFRAME, THREE */

AFRAME.registerComponent("animation-handler", {
  init: function () {
    this.onModelLoaded = this.onModelLoaded.bind(this);
    this.el.addEventListener("model-loaded", this.onModelLoaded);
  },

  tick: function (e, delta) {
    this.mixer && this.mixer.update(delta / 1e3);
  },

  onModelLoaded(event) {
    const modelObj = this.el.components["gltf-model"].model;
    const meshBounds = new THREE.Box3().setFromObject(modelObj);

    let lengthMeshBounds = {
      x: Math.abs(meshBounds.max.x - meshBounds.min.x),
      y: Math.abs(meshBounds.max.y - meshBounds.min.y),
      z: Math.abs(meshBounds.max.z - meshBounds.min.z),
    };

    // As mentioned in document: width=1 means the width is the same as the target image
    // in this case, target image is QR code
    const lengthRatio = [
      1 / lengthMeshBounds.x,
      1 / lengthMeshBounds.y,
      1 / lengthMeshBounds.z,
    ];

    const minRatio = Math.min(...lengthRatio);
    this.el.setAttribute("scale", minRatio + " " + minRatio + " " + minRatio);

    const mixer = new THREE.AnimationMixer(modelObj);
    const clips = modelObj.animations[0];
    if (clips) {
      mixer.clipAction(clips).play();
    }
    this.mixer = mixer;
  },
});
