import React from 'react'
import NavbarBook from '../components/NavbarBook'
import Main from '../components/Main'
import FooterBook from '../components/FooterBook'
import { useState } from 'react'
import BookList from './BookList'



const Home = () => {
  const [books, setBooks] = useState([]);

  return (
    <div>
      <NavbarBook/>  
      <Main book={books} setBooks={setBooks}/>
   
    <BookList books={books} setBook={setBooks}/>

      <FooterBook/>
    </div>
  )
}

export default Home