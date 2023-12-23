import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../img/spinner.gif";
import NotFound from "../pages/NotFound";
import { Navigate, useNavigate } from "react-router-dom";
import AdPage from "../pages/AdPage";
import { HesaplaContext } from "../context/HesaplaContext";

const Main = ({ books, setBooks, sepet, setSepet }) => {
  const [input, setInput] = useState("");
  const [oneriler, setOneriler] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showOneri, setShowOneri] = useState(false);

  const {odemeTutar, setOdemeTutar} =  useContext(HesaplaContext)
 

  const getBooks = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const query = input || ""; //- input boşsa boş string kullan
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=40`;

    try {
      setLoading(false);
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
    setLoading(true); 
    getBooks();
    setShowOneri(false);
    setOneriler([]);
    setBooks([])
    setInput("");
    
  };

  const handleChange = (e) => {
    if (e.target.value) {
      getBooks();
      setShowOneri(true);
    } else {
      setOneriler([]);
      setBooks([]);
      setShowOneri(false);
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
          <h1 className="header mb-4">BOOK STORE</h1>
          <input
            type="text"
            value={input}
            className="w-[500px] h-[40px] rounded p-2 border"
            placeholder="kitap adı, yazar veya yayınevi ara"
            onChange={(e) => {
              setInput(e.target.value);
              handleChange(e);
            }}
          />
          <ul
            className={`absolute cursor-pointer z-2 w-[500px] overflow-auto bg-slate-200 rounded  text-left ${
              showOneri ? "block" : "hidden"
            }`}
          >
            {oneriler.map((book, index) => {
              const { title, authors, publisher } = book.volumeInfo;
              const authorsText = authors
                ? authors.join(", ")
                : "Yazar Bilinmiyor";
              const publisherText = publisher || "Yayınevi Bilinmiyor";
              return (
                <li
                  key={index}
                  onClick={() => {
                    navigate(`/book/${book.id}`);
                    setShowOneri(false);
                  }}
                >
                  <div>
                    <strong>{title}</strong> - {authorsText} - {publisherText}
                  </div>
                </li>
              );
            })}
          </ul>
          <button
          className="bg-gray-300 rounded w-12 h-[40px] text-blue-50"
          onClick={() => {
            handleSubmit();
            setShowOneri(false);
          }}
          type="button"
        >
          Ara
        </button>
        </div>

      
      </div>
    );
  }
};

export default Main;
