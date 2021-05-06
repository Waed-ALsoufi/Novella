import React from "react";
import Main from "./components/Main";
import Slider from "./components/Slider";
function App() {
  const showLaning = false;
  return <div>{showLaning ? <Slider /> : <Main />}</div>;
}

export default App;
