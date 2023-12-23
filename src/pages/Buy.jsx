import React, { useState } from "react";
import { useContext } from "react";
import { HesaplaContext } from "../context/HesaplaContext";

const Buy = ({ sepet }) => {
  console.log(sepet);
  const {odemeTutar, setOdemeTutar} =  useContext(HesaplaContext)

  return (
    <>
      {/* Table */}
      <div className="flex justify-center m-auto w-[70%] h-[70vh] mt-4">
        <div>
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ürün Adı
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Miktar
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Birim Fiyat
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Toplam Tutar
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sil
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Sample row */}
              {sepet.map(({ id, ad, fiyat, miktar, toplamTutar }) => (
                <tr key={id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">{ad}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center justify-start">
                      <button className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full bg-gray-200 hover:bg-gray-300 p-1">
                        -
                      </button>
                      <input
                        type="text"
                        className="mx-2 border text-center w-8"
                        defaultValue={miktar}
                      />
                      <button className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full bg-gray-200 hover:bg-gray-300 p-1">
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      <span>₺</span>
                      {fiyat}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      <span>₺</span>
                      {fiyat * miktar}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button className="text-red-500 hover:text-red-700">
                      <i className="fas fa-times"></i>
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
    </>
  );
};

export default Buy;
