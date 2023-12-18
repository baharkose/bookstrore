import React, { useEffect, useState } from "react";
import axios from "axios";


const Main = ({books,setBooks}) => {
 
  const [input, setInput] = useState("");

  const getBooks = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const query = input || ""; 
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=40`;

    try {
      const response = await axios.get(url);
      console.log(response.data);
      setBooks(response.data.items || []); 
    } catch (error) {
      console.error('Bir hata oluştu!', error);
    }
  };


   

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={getBooks} type="button">Ara</button>

  
     
    </div>
  );
};

export default Main;