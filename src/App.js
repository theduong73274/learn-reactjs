import logo from "./logo.svg";
import React from "react";
import "./App.css";
import TodoFeature from "./features/Todo";

function App() {
  const name = "Dương";
  const age = 18;
  const isMale = true;
  const student = {
    name: "Easy FrontEnd",
  };

  const colorList = ["red", "green", "blue"];

  return (
    <div className="App">
      <TodoFeature />
    </div>
  );
}

export default App;
