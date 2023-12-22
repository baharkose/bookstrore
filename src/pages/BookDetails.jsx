import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import myImage from "../img/books.jpg";

const BookDetails = ({ setIsAuthenticated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);

  useEffect(() => {
    const getBookDetails = async () => {
      setLoading(true);
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`;

      try {
        const response = await axios.get(url);
        console.log("API Response:", response.data); // Log the response
        setBook(response.data);
      } catch (error) {
        console.error("Bir hata oluştu!", error);
      }
      setLoading(false);
    };

    getBookDetails();
  }, [id]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>No book found.</p>;
  }

  const { volumeInfo } = book;
  return (
    <div>
      <h1>Book Detail</h1>

      {/* Flex container */}
      <div className="d-flex justify-content-center align-items-start">
        {/* Card */}
        <Card
          className="mb-4"
          style={{ flex: "1", marginRight: "20px" }} // Adjust card width and add margin
        >
          <Card.Img
            style={{ height: "16rem", objectFit: "cover" }}
            variant="top"
            className="mx-auto d-block"
            src={volumeInfo?.imageLinks?.thumbnail || myImage}
          />
          <Card.Body>
            <Card.Title>{volumeInfo?.title}</Card.Title>
            <Card.Text>{volumeInfo?.authors}</Card.Text>
            <Button variant="primary" onClick={() => navigate("/login")}>
              Sepete Ekle
            </Button>
          </Card.Body>
        </Card>

        {/* Text content */}
        <div style={{ flex: "2" }}>
          {" "}
          {/* Adjust flex value as needed */}
          {volumeInfo?.description ? (
            <div dangerouslySetInnerHTML={{ __html: volumeInfo.description }} />
          ) : (
            "No description available."
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
