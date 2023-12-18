import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import myImage from "../img/books.jpg"

const BookList = ({ BookList, setBook, books }) => {
  return (
    <div className="d-flex flex-wrap gap-4 mt-5 justify-content-center m-auto">
      {books.map((book) => (
        <Card className="mb-4 d-flex justify-content-center card "
        style={{ width: "18rem" }} key={book.id}>
          <Card.Img
          style={{height:"16rem" , width:"16rem" , objectFit:"cover"}}
            variant="top"
            src={book?.volumeInfo?.imageLinks?.thumbnail || myImage}
          />
          <Card.Body>
            <Card.Title>{book?.volumeInfo.title}</Card.Title>
            <Card.Text> {book?.volumeInfo.authors}</Card.Text>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Text><span className="fw-bold">Fiyat: </span> {Math.floor(Math.random() * (25 - 5 + 1) + 5) * 10} <span>₺</span></Card.Text>
            <Button variant="primary">Detayları Görüntüle</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default BookList;
