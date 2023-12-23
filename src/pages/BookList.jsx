import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import myImage from "../img/books.jpg";
import AdPage from "./AdPage";
import ShowModal from "../components/ShowModal";
import { useContext } from "react";
import { HesaplaContext } from "../context/HesaplaContext";

const BookList = ({ books}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const {odemeTutar, setOdemeTutar ,sepet, setSepet} =  useContext(HesaplaContext)

  //- modalShow
  // Her kitap için ayrı bir modal durumu tutmak için bir state nesnesi
  const [showModals, setShowModals] = useState({});

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

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const toplamTutar = sepet.reduce(
      (sum, item) => sum + item.fiyat * item.maiktar,
      0
    );
    setTotal(toplamTutar);
  });

  let urunDetay;
  const handleBasket = (book) => {
    //- aynı ürün var mı?
    const sameUrun = sepet.some((item) => item.id === book.id);

    let urunDetay;
    if (sameUrun) {
      urunDetay = sepet.map((item) =>
        item.id === book.id ? { ...item, miktar: item.miktar + 1 } : item
      );
      setSepet(urunDetay);
    } else {
      urunDetay = {
        id: book.id,
        ad: book.volumeInfo?.title,
        fiyat: Math.floor(Math.random() * (25 - 5 + 1) + 5) * 10,
        miktar: 1,
        toplamTutar: total,
      };

      setSepet((onceki) => [...onceki, urunDetay]);
    }

    toggleModal(book.id);
  };

  // Kitap detayına yönlendirmek için fonksiyon
  const handleCardClick = (id, e) => {
    // Sepete ekle butonuna tıklanmadıysa yönlendir
    if (e.target.tagName !== "BUTTON") {
      navigate(`/book/${id}`);
    }
  };

  //- tekrar eden yapıları engellemek için

  // Modal gösterimi için güncelleme fonksiyonu
  const toggleModal = (id) => {
    setShowModals((prevModals) => ({
      ...prevModals,
      [id]: !prevModals[id],
    }));
  };
  const navigate = useNavigate(); // Initialize navigate function

  if (books.length === 0) {
    return <AdPage />;
  } else {
    return (
      <>
        <div className="d-flex flex-wrap gap-4 mt-5 justify-content-center m-auto w-[70%]">
          {currentItems.map((book) => {
            const { id, volumeInfo } = book;
            return (
              <div
                className="card w-60 h-80 bg-base-50 shadow-xl cursor-pointer"
                key={id}
                style={{ maxHeight: "400px", lineHeight: "1px" }}
                onClick={(e) => handleCardClick(id, e)}
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
                    <span className="fw-bold">Fiyat: </span>{" "}
                    {Math.floor(Math.random() * (25 - 5 + 1) + 5) * 10}
                    <span>₺</span>
                  </p>
                  <div className="card-actions m-auto">
                    <button
                      className="bg-slate-600 rounded-md p-3 text-white"
                      onClick={() => {
                        handleBasket(book);
                      }}
                    >
                      Sepete Ekle
                    </button>
                    {showModals[id] && (
                      <ShowModal
                        showModal={showModals[book.id]}
                        setShowModal={() => toggleModal(book.id)}
                        sepet={sepet}
                        odemeTutar={odemeTutar}
                        setOdemeTutar={setOdemeTutar}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
