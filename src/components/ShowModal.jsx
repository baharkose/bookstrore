import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { HesaplaContext } from "../context/HesaplaContext";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ShowModal = ({ showModal, setShowModal, sepet }) => {
  const { odemeTutar, setOdemeTutar, setSepet } = useContext(HesaplaContext);
  console.log(sepet);
  const navigate = useNavigate()

  const miktarGuncelle = (id, yeniMiktar) => {
    const guncellenmisSepet = sepet.map((item) => {
      if (item.id == id) {
        return { ...item, miktar: yeniMiktar };
      }
      return item;
    });
    setSepet(guncellenmisSepet);
  };

  useEffect(() => {
    // Sepetin bir array olduğundan ve eleman içerdiğinden emin ol
    if (Array.isArray(sepet) && sepet.length) {
      const toplam = sepet.reduce(
        (sum, item) => sum + item.fiyat * item.miktar,
        0
      );
      setOdemeTutar(toplam);
    } else {
      // Sepet boş veya undefined ise ödeme tutarı sıfırlanır
      setOdemeTutar(0);
    }
  }, [sepet, setOdemeTutar]);

  return (
    <div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-sm shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2  border-b border-solid border-slate-200 rounded">
                  <h3 className="font-semibold text-base">
                    Ürün Sepetinize Eklendi
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto">
                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="leading-normal m-2 w-auto">
                      <thead>
                        <tr>
                          <th className="border-b-2 px-1 py-1 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Ürün Adı
                          </th>
                          <th className="px-1 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Miktar
                          </th>
                          <th className="px-1 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Birim Fiyat
                          </th>
                          <th className="px-1 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Toplam Tutar
                          </th>
                          <th className="px-1 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Sil
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Sample row */}
                        {sepet.map(({ id, ad, fiyat, miktar, toplamTutar }) => (
                          <tr key={id}>
                            <td className="border-b border-gray-200 bg-white text-sm">
                              <div className="flex items-center">
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap font-bold">
                                    {ad}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">
                              <div className="flex items-center justify-start">
                                <button
                                  className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full bg-gray-200 hover:bg-gray-300 px-[11px] py-1 cursor-pointer"
                                  onClick={() =>
                                    miktarGuncelle(id, Math.max(1, miktar - 1))
                                  }
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  className="mx-2 border text-center w-8"
                                  value={miktar}
                                />
                                <button
                                  className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full bg-gray-200 hover:bg-gray-300 px-[9px] py-1 cursor-pointer"
                                  onClick={() => miktarGuncelle(id, miktar + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                <span>₺</span>
                                {fiyat}
                              </p>
                            </td>
                            <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                <span>₺</span>
                                {miktar * fiyat}
                              </p>
                            </td>
                            <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">
                              <button className="text-red-500 hover:text-red-700">
                              <MdDelete />
                              </button>
                            </td>
                          </tr>
                        ))}
                        <tr>
                          {
                            <td
                              colSpan="5"
                              className="px-1 py-1 border-b border-gray-200 bg-white text-sm"
                            >
                              <span>Ödenecek Tutar: {odemeTutar} </span>
                            </td>
                          }
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-gray-400 rounded-md w-[36pxpx] h-[36px] px-2 text-white"
                    type="button"
                    onClick={() => {setShowModal(false);
                    navigate("/buy")
                    }}
                    
                  >
                    Go To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default ShowModal;
