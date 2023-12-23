import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
import Buy from "./pages/Buy";
import Main from "./components/Main";

import FooterBook from "./components/FooterBook";
import NavbarBook from "./components/NavbarBook";
import { HesaplaContext } from "./context/HesaplaContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [sepet, setSepet] = useState([]);
  const [odemeTutar, setOdemeTutar] = useState(0);
  return (
    <div className="App">
      <HesaplaContext.Provider value={{odemeTutar, setOdemeTutar}}>
        <BrowserRouter>
          <NavbarBook />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  sepet={sepet}
                  setSepet={setSepet}
                />
              }
            />
            <Route
              path="main"
              element={
                <Main
                  sepet={sepet}
                  setSepet={setSepet}
                />
              }
            />
            <Route
              path="/booklist"
              element={
                <BookList
                  sepet={sepet}
                  setSepet={setSepet}
                />
              }
            />
            <Route
              path="/buy"
              element={
                <Buy
                  sepet={sepet}
                />
              }
            />
            <Route
              path="/book/:id"
              element={<BookDetails setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/login" element={<Login />} />
            
          </Routes>
          <FooterBook />
        </BrowserRouter>
      </HesaplaContext.Provider>
    </div>
  );
}

export default App;
