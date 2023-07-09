/* eslint-disable @next/next/no-img-element */
import React from "react";

// * IMAGES
import Logo from "../images/logo.png";
import cartIcon from "../images/cartIcon.png";

//* Redux
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../type";

//* Next Auth
import { useSession, signIn, signOut } from "next-auth/react";
import { addUser } from "@/store/nextSlice";

//* React Icons
import { BiCaretDown, BiHomeAlt, BiUser } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import { MdFavoriteBorder } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

/**
 * Rendre le composant de la barre de navigation mobile.
 * @returns Le composant de la barre de navigation mobile.
 */
const MobileNavbar = () => {
  // Obtenir les données de session
  const { data: session } = useSession();

  // Obtenir les données requises du store Redux
  const { productData, favoriteData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );

  // Obtenir la fonction de dispatch pour les actions Redux
  const dispatch = useDispatch();

  // Rendre la barre de navigation mobile
  return (
    <div className="w-full h-12 bg-amazon_blue text-lightText sticky z-50 bottom-0 flex items-center justify-between mdl:hidden">
      <div className="h-full w-full mx-auto flex justify-between items-center gap-1 mdl:gap-3 px-4 ml-5 mr-5">
        {/* Logo */}
        <Link
          href={"/"}
          className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]"
        >
          <BiHomeAlt className="text-2xl" />
        </Link>

        {/* Utilisateur */}
        <div
          onClick={() => signIn()}
          className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]"
        >
          {userInfo ? (
            <img
              className="w-8 object-cover"
              src={userInfo.image}
              alt="logoImg"
            />
          ) : (
            <BiUser className="text-2xl" />
          )}
        </div>

        {/* Favori */}
        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]">
          <MdFavoriteBorder className="text-2xl" />
        </div>

        {/* Panier */}
        <div className="flex items-center justify-center h-[70%] border border-transparent hover:border-white cursor-pointer duration-300">
          <Link href={"/cart"} className="px-2">
            <span className="absolute text-amazon_yellow text-xs top-2 right-[55px] font-semibold">
              {productData ? productData.length : 0}
            </span>
            <Image className="w-8 object-cover" src={cartIcon} alt="logoImg" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
