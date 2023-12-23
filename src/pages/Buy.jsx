import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { HesaplaContext } from "../context/HesaplaContext";

const Buy = () => {
  const { odemeTutar, setOdemeTutar, sepet, setSepet } =
    useContext(HesaplaContext);

  const miktarGuncelle = (id, yeniMiktar, miktar) => {
    let guncellenmisSepet = sepet.map((item) => {
      if (item.id == id) {
        return { ...item, miktar: yeniMiktar };
      }
      return item;
    });
    setSepet(guncellenmisSepet);
  };

  const sepetSil = (id, miktar) => {
    const guncellenmisSepet = sepet.filter((item) => item.id !== id);
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
    <>
      {/* Table */}
      <div className="flex justify-center m-auto w-[70%] h-[70vh] mt-4">
        <div>
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className=" border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ürün Adı
                </th>
                <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Miktar
                </th>
                <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Birim Fiyat
                </th>
                <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Toplam Tutar
                </th>
                <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sil
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Sample row */}
              {sepet.map(({ id, ad, fiyat, miktar, toplamTutar }) => (
                <tr key={id}>
                  <td className=" border-b px-1 py-2 border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap font-semibold text-center m-auto">
                          {ad}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className=" border-b px-1 py-2 border-gray-200 bg-white text-sm">
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
                  <td className=" border-b px-1 py-2 border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-center m-auto">
                      <span>₺</span>
                      {fiyat}
                    </p>
                  </td>
                  <td className=" border-b px-1 py-2 border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-center m-auto">
                      <span>₺</span>
                      {fiyat * miktar}
                    </p>
                  </td>
                  <td className=" border-b px-1 py-2 border-gray-200 bg-white  ">
                    <button
                      className="text-red-500 hover:text-red-700 text-xl"
                      onClick={() => sepetSil(id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}

              <tr>
                {
                  <td
                    colSpan="5"
                    className="px-1 py-1 border-b px-1 py-2 border-gray-200 text-center bg-white text-sm"
                  >
                    <span className="text-red-500 text-base font-bold">Ödenecek Tutar: {odemeTutar} </span>
                  </td>
                }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Buy;
