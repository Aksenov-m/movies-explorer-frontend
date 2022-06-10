import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <div className='page__container'>
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
