import React from "react";
import Slider from "react-slick"; // Slider bileşenini import edin
import "slick-carousel/slick/slick.css"; // Slick CSS'lerini import edin
import "slick-carousel/slick/slick-theme.css"; // Slick tema CSS'ini import edin
import img1 from "../img/slider/1.png";
import img2 from "../img/slider/2.png";
import img3 from "../img/slider/3.png";
import img4 from "../img/slider/4.png";
import img5 from "../img/slider/5.png";
import img6 from "../img/slider/6.png";

const AdPage = () => {
  const settings = {
    dots: true, // Nokta göstergelerini aktif et
    infinite: true, // Sonsuz döngü
    speed: 500, // Geçiş hızı
    slidesToShow: 1, // Her seferinde gösterilecek slayt sayısı
    slidesToScroll: 1, // Kaydırılacak slayt sayısı
    autoplay: true, // Otomatik oynatmayı aktif et
    autoplaySpeed: 2000, // Otomatik geçiş hızı (milisaniye cinsinden)
  };

  return (
    <div className="flex justify-center my-6">
      {/* <div className="w-6/12 rounded-lg ">
        <Slider {...settings}>
          <div className="">
            <img src={img1} alt="Slide 1" />
          </div>
          <div>
            <img src={img2} alt="Slide 2" />
          </div>
          <div>
            <img src={img3} alt="Slide 3" />
          </div>
          <div>
            <img src={img4} alt="Slide 4" />
          </div>
          <div>
            <img src={img5} alt="Slide 5" />
          </div>
          <div>
            <img src={img6} alt="Slide 6" />
          </div>
        </Slider>
      </div> */}
    </div>
  );
};

export default AdPage;
