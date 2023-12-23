import React from "react";
import NavbarBook from "../components/NavbarBook";
import Main from "../components/Main";
import FooterBook from "../components/FooterBook";
import { useState } from "react";
import BookList from "./BookList";

const Home = ({sepet, setSepet}) => {
  const [books, setBooks] = useState([]);
  const [oneriler, setOneriler] = useState([]);

  return (
    <div className="bg-blue-400 ">
      <Main book={books} setBooks={setBooks} oneriler={oneriler} setOneriler={setOneriler} />
      <BookList books={books} setBook={setBooks} oneriler={oneriler} sepet={sepet} setSepet={setSepet} />
    </div>
  );
};

export default Home;
