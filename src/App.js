import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";

import FooterBook from "./components/FooterBook";
import NavbarBook from "./components/NavbarBook";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarBook />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booklist" element={<BookList />} />
          <Route
            path="/book/:id"
            element={<BookDetails setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
        <FooterBook />
      </BrowserRouter>
    </div>
  );
}

export default App;
