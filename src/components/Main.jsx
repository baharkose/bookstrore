import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../img/spinner.gif";
import NotFound from "../pages/NotFound";

const Main = ({ books, setBooks }) => {
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const getBooks = async () => {
    setLoading(true); // Start loading here
    const apiKey = process.env.REACT_APP_API_KEY;
    const query = input || "";
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=40`;

    try {
      const response = await axios.get(url);
      console.log(response.data);
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Bir hata oluştu!", error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    getBooks();
  };

  useEffect(() => {
    if (input) {
      getBooks();
    }
  }, [input]);


  if (loading) {
    return (
      <div className="text-center mt-4">
        <img src={Spinner} alt="spinner" />
      </div>
    );
  } else {
    return (
      <div className="text-center">
        <input
          type="text"
          value={input} 
          className="w-[500px] h-[36px] rounded"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {/* <button onClick={getBooks} type="button">Ara</button> */}
      </div>
    );
  }
};

export default Main;
