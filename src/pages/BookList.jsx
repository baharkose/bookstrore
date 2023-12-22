import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import myImage from "../img/books.jpg";
import AdPage from "./AdPage";
import ShowModal from "../components/ShowModal";

const BookList = ({ books }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  //- modalShow
  const [showModal, setShowModal] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage; //- her sayfanın son elemanının index bilgisini getirir.
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; //- her sayfanın ilk elemanının index numarasını verir
  const currentItems = books.slice(indexOfFirstItem, indexOfLastItem); //- hangi sayfada hangi kitap görüntülenecek
  const paginate = (pageNumber) => setCurrentPage(pageNumber); //- mevcut sayfa numarasını güncelleme fonksiyonu

  //- sayfa numaralarını oluşturma
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(books.length / itemsPerPage); i++) {
    pageNumbers.push(i);
    //- toplam kitap sayısını sayfa saftafaki eleman sayısına bölerek sayfa sayısını bulduk bunun için buton oluşturacağız.
  }

  const navigate = useNavigate(); // Initialize navigate function

  if (books.length === 0) {
    return <AdPage />;
  } else {
    return (
      <>
        <div className="d-flex flex-wrap gap-4 mt-5 justify-content-center m-auto">
          {currentItems.map((book) => {
            const { id, volumeInfo } = book; // Destructure here, outside of return statement
            return (
              <div
                className="card w-60 h-80 bg-base-50 shadow-xl cursor-pointer"
                key={id}
                style={{ maxHeight: "400px", lineHeight: "1px" }}
                onClick={() => navigate(`/book/${id}`)}
              >
                <figure className="m-auto">
                  <img
                    src={volumeInfo?.imageLinks?.thumbnail || myImage}
                    alt={volumeInfo?.title}
                    style={{
                      height: "12rem",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </figure>
                <div className="card-body text-sm leading-none m-auto text-center">
                  <h5 className="card-title text-sm">{volumeInfo?.title}</h5>
                  <p>
                    {volumeInfo?.authors
                      ? volumeInfo.authors[0]
                      : "Yazar Bilinmiyor"}
                  </p>
                  <p className="">{volumeInfo?.publisher}</p>
                  <p>
                    <span className="fw-bold">Fiyat: </span>
                    {Math.floor(Math.random() * (25 - 5 + 1) + 5) * 10}{" "}
                    <span>₺</span>
                  </p>
                  <div className="card-actions m-auto">
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowModal(true)}
                    >
                      Sepete Ekle
                    </button>
                    <ShowModal
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* // * Pagination butonları */}
        <nav>
          <ul className="pagination flex justify-center items-center">
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(number);
                  }}
                  href="#"
                  className="page-link"
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </>
    );
  }
};

export default BookList;
