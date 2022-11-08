import React, { useCallback, useEffect, useRef, useState } from "react";
import { useArManager } from "./hooks";

const MindARViewer = () => {
  const sceneRef = useRef(null);
  const { startAR, stopAR, arSystem } = useArManager(sceneRef);

  const [enabled, setEnabled] = useState(true);

  const handleArAction = () => {
    if (!arSystem) return;
    if (enabled) {
      stopAR();
    } else {
      startAR();
    }

    setEnabled(!enabled);
  };

  const handleRedirect = (element, link) => {
    if (!element) return;
    element.addEventListener("click", () => {
      console.log(element);
      window.location.href = link;
    });
  };

  const handleLogoClick = useCallback(() => {
    const facebookLogo = document.getElementById("facebook");
    const instagramLogo = document.getElementById("instagram");
    const linkedinLogo = document.getElementById("linkedin");

    handleRedirect(facebookLogo, "https://www.facebook.com/mywebar/");
    handleRedirect(instagramLogo, "https://www.instagram.com/mywebar/");
    handleRedirect(
      linkedinLogo,
      "https://www.linkedin.com/company/devar-official/"
    );
  }, []);

  useEffect(() => {
    handleLogoClick();
  }, [handleLogoClick]);

  return (
    <div className="container">
      <button className="start-button" onClick={handleArAction}>
        {enabled ? "Stop" : "Start"}
      </button>
      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: ./compiler/data.mind;"
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        gesture-detector
      >
        <a-assets timeout="30000">
          <img id="facebook-logo" src="./image/facebook-logo.webp" alt="" />
          <img id="instagram-logo" src="./image/instagram-logo.webp" alt="" />
          <img id="linkedin-logo" src="./image/linkedin-logo.png" alt="" />
          <img id="eddie-bird" src="./model/eddie-bird.png" alt="" />
          <a-asset-item id="mooncat" src="./model/mooncat.gltf"></a-asset-item>
          <a-asset-item
            id="phoenix"
            src="./model/phoenix/scene.gltf"
          ></a-asset-item>
          <a-asset-item id="torus" src="./model/torus.glb"></a-asset-item>
          <a-asset-item id="trex" src="./model/trex/scene.gltf"></a-asset-item>
          <a-asset-item
            id="flying-hummingbird"
            src="./model/flying-hummingbird.glb"
          ></a-asset-item>
          <a-asset-item
            id="business-card"
            src="./model/business-card/scene.gltf"
          />
        </a-assets>

        <a-camera
          position="0 0 0"
          look-controls="enabled: false"
          cursor="fuse: false; rayOrigin: mouse;"
          raycaster="far: 10000; objects: .clickable"
        ></a-camera>

        <a-entity visible={enabled}>
          <a-entity mindar-image-target="targetIndex: 0">
            <a-gltf-model
              position="0 0 0"
              rotation="0 0 0"
              src="#torus"
              animation-handler
              object-detection
              action-handler
              gesture-handler="locationBased: true; minScale: 0.0005; maxScale: 5;"
            ></a-gltf-model>
          </a-entity>
          <a-entity mindar-image-target="targetIndex: 1">
            <a-plane
              position="0 0 0"
              rotation="0 0 0"
              src="#eddie-bird"
              width="0.75"
              height="0.75"
              object-detection
              action-handler
              gesture-handler="locationBased: true; minScale: 0.0001; maxScale: 5;"
            ></a-plane>
          </a-entity>
          <a-entity mindar-image-target="targetIndex: 2">
            <a-gltf-model
              position="0 0 0"
              rotation="0 0 0"
              src="#phoenix"
              animation-handler
              object-detection
              action-handler
              gesture-handler="locationBased: true; minScale: 0.0005; maxScale: 5;"
            ></a-gltf-model>
          </a-entity>
          <a-entity mindar-image-target="targetIndex: 3">
            <a-gltf-model
              position="0 0 0"
              rotation="0 0 0"
              src="#trex"
              animation-handler
              object-detection
              action-handler
              gesture-handler="locationBased: true; minScale: 0.0005; maxScale: 5;"
            ></a-gltf-model>
          </a-entity>
          <a-entity mindar-image-target="targetIndex: 4">
            <a-gltf-model
              position="0 0 0"
              rotation="0 0 0"
              src="#flying-hummingbird"
              animation-handler
              object-detection
              action-handler
              gesture-handler="locationBased: true; minScale: 0.0005; maxScale: 5;"
            ></a-gltf-model>
          </a-entity>
          <a-entity mindar-image-target="targetIndex: 5">
            <a-gltf-model
              position="0 0 0"
              rotation="180 0 180"
              src="#mooncat"
              animation-handler
              object-detection
              action-handler
              gesture-handler="locationBased: true; minScale: 0.0005; maxScale: 5;"
            ></a-gltf-model>
          </a-entity>
          <a-entity mindar-image-target="targetIndex: 6">
            <a-plane
              id="facebook"
              class="clickable"
              src="#facebook-logo"
              position="-0.4 -0.75 0"
              rotation="0 0 0"
              width="0.25"
              height="0.25"
            ></a-plane>
            <a-plane
              id="instagram"
              class="clickable"
              src="#instagram-logo"
              position="0 -0.75 0"
              rotation="0 0 0"
              width="0.25"
              height="0.25"
            ></a-plane>
            <a-plane
              id="linkedin"
              class="clickable"
              src="#linkedin-logo"
              position="0.4 -0.75 0"
              rotation="0 0 0"
              width="0.25"
              height="0.25"
            ></a-plane>
            <a-gltf-model
              position="0 -0.5 0"
              rotation="0 0 0"
              src="#business-card"
              animation-handler
            ></a-gltf-model>
          </a-entity>
        </a-entity>
      </a-scene>
    </div>
  );
};

export default MindARViewer;
