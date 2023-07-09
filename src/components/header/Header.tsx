/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
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
import { ProductProps, StateProps, StoreProduct } from "../../../type";

//* Next Auth
import { useSession, signIn, signOut } from "next-auth/react";
import { addUser } from "@/store/nextSlice";
import Products from "../Products";
import FilteredProducts from "../FilteredProducts";
interface Props {
  products: ProductProps[];
}

const Header = () => {
  const { data: session } = useSession();
  const [allData, setAllData] = useState([]);
  const { productData, favoriteData, userInfo, allProducts } = useSelector(
    (state: StateProps) => state.next
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setAllData(allProducts.allProducts);
  }, [allProducts]);
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

  // Search area
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = allData.filter((item: StoreProduct) =>
      item.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, allData]);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

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
            value={searchQuery}
            onChange={handleSearch}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>{" "}
          {/* ========== Searchfield ========== */}
          {searchQuery && (
            <div className="absolute left-0 top-9 w-full mx-auto max-h-96 bg-gray-200 rounded-b-lg overflow-y-scroll cursor-pointer border-solid border-[1px] border-gray-400  text-black">
              {filteredProducts.length > 0 ? (
                <>
                  {searchQuery &&
                    filteredProducts.map((item: StoreProduct) => (
                      <Link
                        key={item._id}
                        className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                        href={{
                          pathname: `${item._id}`,
                          query: {
                            _id: item._id,
                            brand: item.brand,
                            category: item.category,
                            description: item.description,
                            image: item.image,
                            isNew: item.isNew,
                            oldPrice: item.oldPrice,
                            price: item.price,
                            title: item.title,
                          },
                        }}
                        onClick={() => setSearchQuery("")}
                      >
                        <FilteredProducts item={item} />
                      </Link>
                    ))}
                </>
              ) : (
                <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
                  <p className="text-xs mdl:text-lg text-center  font-semibold">
                    Nous n'avons trouvé aucun produit. Veuillez réessayer !
                  </p>
                </div>
              )}
            </div>
          )}
          {/* ========== Searchfield ========== */}
        </div>

        {/* signIn */}
        {userInfo ? (
          <div className="mdl:flex hidden  items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-3">
            <img
              src={userInfo?.image}
              alt="userImage"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-xs min-[820px]:flex hidden text-gray-100 flex flex-col">
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
        <Link
          href={"/favorite"}
          className="relative text-xs text-gray-100 hidden mdl:flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
        >
          <p>Vos </p>
          <p className="text-white font-bold">produits favoris</p>
          {favoriteData && (
            <span className="absolute right-[65px] top-[11px] w-4 h-4  flex items-center justify-center text-sm text-amazon_yellow font-semibold">
              {favoriteData.length}
            </span>
          )}
        </Link>
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
