import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// import Nav from "./components/Nav";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
      </Router>
    </div>
  );
}

export default App;
