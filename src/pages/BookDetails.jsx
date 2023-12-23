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
  const { odemeTutar, setOdemeTutar, setSepet, sepet } =
    useContext(HesaplaContext);

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
    <div className=" mx-auto p-4 w-10/12  ">
      <h1 className="text-2xl font-bold ">Book Detail</h1>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              className="w-[100%] h-[24rem] p-2 object-cover object-center"
              src={volumeInfo?.imageLinks?.thumbnail || myImage}
              alt="Book cover"
            />
            <div className="p-4">
              <p className="text-base mb-2 ">
                <span className="font-bold">Book Name:</span>{" "}
                {volumeInfo?.title}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Author: </span>
                {volumeInfo?.authors?.join(", ")}
              </p>
              <p className="">
                <span className="font-bold">Publisher: </span>
                {volumeInfo?.publisher}
              </p>
              <p>
                <span className="font-bold">Price: </span>{" "}
                {Math.floor(Math.random() * (25 - 5 + 1) + 5) * 10}
                <span>₺</span>
              </p>
              <button
                className="bg-gray-400 w-[100%] rounded-md w-[36pxpx] h-[36px] px-2 text-white"
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
        <div className="w-full sm:w-1/2 pl-2">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <p className="font-bold">Açıklama:</p>
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
