import React from "react";
import { render } from "react-dom";
import Scene from "./Scene";

const App = () => (
  <div>
    <Scene />
  </div>
);

render(<App />, document.getElementById("root"));
