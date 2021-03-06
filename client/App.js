import React from "react";
import Navbar from "./components/Navbar";
import PosesProvider from "./contexts/posesContext";
import Routes from "./Routes";
import styled from "styled-components";


const App = () => {
  return (
    <div>
      <Navbar />
      <PosesProvider>
        <Routes />
      </PosesProvider>
    </div>
  );
};

export default App;
