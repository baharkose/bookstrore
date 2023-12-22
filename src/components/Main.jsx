import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../img/spinner.gif";
import NotFound from "../pages/NotFound";
import { Navigate, useNavigate } from "react-router-dom";
import AdPage from "../pages/AdPage";

const Main = ({ books, setBooks }) => {
  const [input, setInput] = useState("");
  const [oneriler, setOneriler] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getBooks = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const query = input || ""; //- input boşsa boş string kullan
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=40`;

    try {
      const response = await axios.get(url);

      const filteredBooks = response.data.items.filter(
        //- yayınevi yazar ya da kitap adına göre filtreleme
        (book) =>
          book.volumeInfo.title.toLowerCase().includes(input.toLowerCase()) ||
          (book.volumeInfo.authors &&
            book.volumeInfo.authors.some((author) =>
              author.toLowerCase().includes(input.toLowerCase())
            )) ||
          (book.volumeInfo.publisher &&
            book.volumeInfo.publisher
              .toLowerCase()
              .includes(input.toLowerCase()))
      );

      const tekFilteredBooks = filteredBooks.find((item) => item);
      console.log(tekFilteredBooks);

      console.log(response.data);
      setOneriler(filteredBooks);
      setBooks(filteredBooks); //- Eğer hiç kitap yoksa, boş liste ataması yap
    } catch (error) {
      console.error("Bir hata oluştu!", error);
    }
  };

  const handleSubmit = (e) => {
    setLoading(true); // Start loading here
    getBooks();
    setLoading(false);
  };

  const handleChange = (e) => {
    if (e.target.value) {
      getBooks();
    } else {
      setOneriler([]);
      setBooks([]);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <img src={Spinner} alt="spinner" />
      </div>
    );
  } else {
    return (
      <div className="text-center d-flex justify-center">
        <div className="input relative">
          <input
            type="text"
            value={input}
            className="w-[500px] h-[36px] rounded"
            placeholder="kitap adı, yazar veya yayınevi ara"
            onChange={(e) => {
              setInput(e.target.value);
              handleChange(e);
            }}
          />
          <ul
            className={`absolute cursor-pointer z-20 bg-slate-200 rounded  text-left ${
              oneriler.length !== 0 ? "block" : "hidden"
            }`}
          >
            {oneriler.map((book, index) => {
              const { title, authors, publisher } = book.volumeInfo;
              const authorsText = authors
                ? authors.join(", ")
                : "Yazar Bilinmiyor";
              const publisherText = publisher || "Yayınevi Bilinmiyor";
              return (
                <li key={index} 
                onClick={() => navigate(`/book/${book.id}`)}>
                  <div>
                    <strong>{title}</strong> - {authorsText} - {publisherText}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          className="bg-gray-300 rounded w-12 text-blue-50"
          onClick={handleSubmit}
          type="button"
        >
          Ara
        </button>
      </div>
    );
  }
};

export default Main;
