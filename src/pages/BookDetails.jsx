import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import myImage from "../img/books.jpg";
import ShowModal from "../components/ShowModal";
import { HesaplaContext } from "../context/HesaplaContext";



const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { odemeTutar, setOdemeTutar, setSepet, sepet } = useContext(HesaplaContext);

  useEffect(() => {
    const getBookDetails = async () => {
      setLoading(true);
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`;

      try {
        const response = await axios.get(url);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details!", error);
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
    <div className="container mx-auto p-4 w-10/12 bg-green-100 font-montserrat">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Book Detail</h1>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full sm:w-1/2 p-2">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              className="w-full h-64 object-cover object-center"
              src={volumeInfo?.imageLinks?.thumbnail || myImage}
              alt="Book cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-green-800">{volumeInfo?.title}</h2>
              <p className="text-gray-700">{volumeInfo?.authors?.join(", ")}</p>
              <p className="text-green-700">
                <span className="font-bold">Price: </span>{" "}
                {Math.floor(Math.random() * (25 - 5 + 1) + 5) * 10}
                <span>₺</span>
              </p>
              <button
                className="mt-4 bg-white text-green-600 border border-green-600 hover:bg-green-600 hover:text-white active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg focus:outline-none ease-linear transition-all duration-150"
                onClick={() => setShowModal(true)}
              >
                Add to Cart
              </button>
              {showModal && (
                <ShowModal
                  showModal={showModal}
                  setShowModal={setShowModal}
                  sepet={sepet}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-2">
          <div className="bg-white shadow-lg rounded-lg p-4">
            {volumeInfo?.description ? (
              <div
                dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
              />
            ) : (
              "No description available."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
