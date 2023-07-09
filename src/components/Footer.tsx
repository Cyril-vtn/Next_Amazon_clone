import Image from "next/image";
import React from "react";
import logo from "../images/logo.png";

/**
 *Rendre le composant footer.
 *
 * @returns {JSX.Element} Le composant footer rendu.
 */

const footer = () => {
  return (
    <div className="w-full h-20 bg-amazon_light text-gray-200 flex items-center justify-center gap-4">
      <Image className="w-24 " src={logo} alt="logoImg" />
      <p className="text-xs -mt-4 flex flex-col md:flex-row md:gap-2 ">
        {/* Afficher les droits d'auteur */}
        Tout droits reservé{" "}
        <a
          className="hover:text-white underline decoration-[1px] cursor-pointer duration-300"
          href="https://www.cyrilvotion.com/"
          target="_blank"
        >
          {/* Lien vers cyrilvotion.com */}
          @cyrilvotion.com
        </a>
      </p>
    </div>
  );
};

export default footer;
