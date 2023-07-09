import React from "react";
import { useEffect } from "react";

// * IMAGES
import Logo from "../../images/logo.png";
import cartIcon from "../../images/cartIcon.png";
//* NextJS
import Image from "next/image";
import Link from "next/link";

//* React Icons
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";

//* Redux
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../../type";

//* Next Auth
import { useSession, signIn, signOut } from "next-auth/react";
import { addUser } from "@/store/nextSlice";
const Header = () => {
  const { data: session } = useSession();
  const { productData, favoriteData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    }
  }, [session, dispatch]);
  return (
    <div className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50">
      <div className="h-full w-full   mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4 ">
        {/* Logo */}
        <Link
          href={"/"}
          className="px-2 hidden sml:inline-flex border border-transparent hover:border-white cursor-pointer duration-300  items-center justify-center h-[70%]"
        >
          <Image className="w-28 object-cover mt-1" src={Logo} alt="logoImg" />
        </Link>
        {/* livraison */}
        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300  items-center justify-center h-[70%] hidden xl:inline-flex gap-1">
          <SlLocationPin className="text-white" />
          <div className="text-xs ">
            <p>Livrer en</p>
            <p className="text-white font-bold uppercase">FRANCE</p>
          </div>
        </div>
        {/* search bar */}
        <div className="flex-1 h-10 inline-flex items-center justify-between relative">
          <input
            className="w-full h-full rounded-md outline-none px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent focus-visible:border-amazon_yellow"
            type="text"
            placeholder="Rechercher Amazon.fr"
          />
          <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>
        </div>
        {/* signIn */}
        {userInfo ? (
          <div className="mdl:flex hidden  items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-3">
            <Image
              src={userInfo?.image}
              alt="userImage"
              className="w-8 h-8 rounded-full object-cover"
              width={40}
              height={40}
            />
            <div className="text-xs text-gray-100 flex flex-col">
              <p className="text-white font-bold">{userInfo?.name}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-100  flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] hidden mdl:flex"
          >
            <p>Bonjour, se connecter</p>
            <p className="text-white font-bold flex items-center ">
              Compte et listes{" "}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}
        {/* favorite */}
        <div className="relative text-xs text-gray-100 hidden mdl:flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]">
          <p>Vos </p>
          <p className="text-white font-bold">produits favoris</p>
          {favoriteData && (
            <span className="absolute right-[65px] top-[11px] w-4 h-4  flex items-center justify-center text-sm text-amazon_yellow font-semibold">
              {favoriteData.length}
            </span>
          )}
        </div>
        {/* cart */}
        <Link
          href={"/cart"}
          className="hidden mdl:flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative "
        >
          <Image
            className="w-auto object-cover h-8"
            src={cartIcon}
            alt="cartImg"
          />
          <p className="text-xs text-white font-bold mt-3 hidden lg:block">
            Panier
          </p>
          <span className="absolute text-amazon_yellow text-sm top-2 left-[29px] font-semibold">
            {productData ? productData.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
