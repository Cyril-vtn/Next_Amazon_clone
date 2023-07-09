import React from "react";
import { Carousel } from "react-responsive-carousel";
import sliderImg_1 from "../images/slider/sliderImg_1.jpg";
import sliderImg_2 from "../images/slider/sliderImg_2.jpg";
import sliderImg_3 from "../images/slider/sliderImg_3.jpg";
import sliderImg_4 from "../images/slider/sliderImg_4.jpg";
import Image from "next/image";

/**
 * Rend un bannière avec un carrousel d'images.
 * @returns {JSX.Element} Le composant bannière rendu.
 */
const Banner = () => {
  return (
    // Conteneur pour la bannière
    <div className="relative">
      {/* Composant Carrousel */}
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {/* Diapositive 1 */}
        <div>
          <Image priority src={sliderImg_1} alt="sliderImg1" />
        </div>
        {/* Diapositive 2 */}
        <div>
          <Image src={sliderImg_2} alt="sliderImg2" />{" "}
        </div>
        {/* Diapositive 3 */}
        <div>
          <Image src={sliderImg_3} alt="sliderImg3" />{" "}
        </div>
        {/* Diapositive 4 */}
        <div>
          <Image src={sliderImg_4} alt="sliderImg4" />{" "}
        </div>
      </Carousel>
      {/* Superposition de dégradé transparent */}
      <div className="w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 z-20  hidden mdl:block"></div>
    </div>
  );
};

export default Banner;
