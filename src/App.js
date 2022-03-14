import logo from "./logo.svg";
import React from "react";
import "./App.css";

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Thế Dương 09 </p>
        Learn React
        <p>
          Xin chào {name} - {age} - {isMale ? "Male" : "Female"}
        </p>
        {/* When content small */}
        {isMale ? <p>Male</p> : <p>Femele</p>}
        {/* when Content large */}
        {isMale && <p>Ối dồi ôi</p>}
        {!isMale && <p>05165146514654135113</p>}
        {isMale && (
          <div>
            <p>Ối dồi ôi</p>
            <p>Ối dồi ôi</p>
          </div>
        )}
        {isMale && (
          <React.Fragment>
            <p>Thẻ 1</p>
            <p>Thẻ 2</p>
            <p>Thẻ 3</p>
          </React.Fragment>
        )}
        {isMale && (
          <>
            <p>{student.name}</p>
            <p>Thẻ 5</p>
            <p>Thẻ 6</p>
          </>
        )}
        <ul>
          {colorList.map((color) => (
            <li key={color} style={{ color }}>
              {color}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
