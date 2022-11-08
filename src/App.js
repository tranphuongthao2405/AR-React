import React from "react";
import "mind-ar/dist/mindar-image.prod.js";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
import MindARViewer from "./mindar-viewer";

function App() {
  return (
    <div className="App">
      <h1>Example React with AR</h1>

      <MindARViewer />
    </div>
  );
}

export default App;
