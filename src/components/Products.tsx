import React from "react";
import { ProductProps } from "../../type";
import Image from "next/image";
import { HiShoppingCart } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import FormattedPrice from "./FormattedPrice";
import { useDispatch } from "react-redux";
import { addToCart, addToFavorite } from "@/store/nextSlice";
import Link from "next/link";

/**
 * Rend une liste de produits.
 *
 * @param products - Un tableau d'objets produit.
 * @returns Élément JSX représentant la liste des produits.
 */
const Products = ({ productData }: any) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-6">
      {productData.map(
        ({
          _id,
          title,
          brand,
          category,
          description,
          image,
          isNew,
          oldPrice,
          price,
        }: ProductProps) => (
          <div
            key={_id}
            className="w-full relative bg-white text-black p-4 border border-gray-300 rounded-lg shadow-lg group"
          >
            <div className="w-full h-[400px] relative overflow-hidden">
              <Link
                href={{
                  pathname: `/${_id}`,
                  query: {
                    _id: _id,
                    brand: brand,
                    category: category,
                    description: description,
                    image: image,
                    isNew: isNew,
                    oldPrice: oldPrice,
                    price: price,
                    title: title,
                  },
                }}
              >
                <Image
                  className="w-full h-full object-cover scale-90 hover:scale-100 transition-transform duration-300"
                  width={300}
                  height={300}
                  src={image}
                  alt="productImage"
                />
              </Link>

              <div className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 duration-300">
                {/* Bouton Ajouter au panier */}
                <span
                  onClick={() => {
                    dispatch(
                      addToCart({
                        _id,
                        title,
                        brand,
                        category,
                        description,
                        image,
                        isNew,
                        oldPrice,
                        price,
                        quantity: 1,
                      })
                    );
                  }}
                  className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer transition-transform duration-300 "
                >
                  <HiShoppingCart />
                </span>
                {/* Bouton Ajouter aux favoris */}
                <span
                  onClick={() =>
                    dispatch(
                      addToFavorite({
                        _id,
                        title,
                        brand,
                        category,
                        description,
                        image,
                        isNew,
                        oldPrice,
                        price,
                        quantity: 1,
                      })
                    )
                  }
                  className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300 "
                >
                  <FaHeart />
                </span>
              </div>
            </div>
            {/* Affiche le badge vente flash */}
            {isNew && (
              <p className="absolute top-4 right-2 text-amazon_blue font-meduim text-xs tracking-wide animate-bounce">
                <span className="text-red-600 font-bold">vente flash</span> -
                <FormattedPrice amount={oldPrice - price} />
              </p>
            )}
            <hr />
            <div className="px-4 py-3 flex flex-col gap-1">
              <p className="text-xs text-gray-500 tracking-wide">{category}</p>
              <p className="text-base font-medium">{title}</p>
              <p className="flex items-center gap-2">
                {/* Affiche le prix original */}
                <span className="text-sm line-through">
                  <FormattedPrice amount={oldPrice} />
                </span>
                {/* Affiche le prix réduit */}
                <span className="text-amazon_blue font-semibold">
                  <FormattedPrice amount={price} />
                </span>
              </p>
              {/* Affiche la description du produit tronquée */}
              <p className="text-xs text-gray-600 text-justify">
                {description.substring(0, 120)}
              </p>
              {/*  Bouton ajouter au panier */}
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      _id,
                      title,
                      brand,
                      category,
                      description,
                      image,
                      isNew,
                      oldPrice,
                      price,
                      quantity: 1,
                    })
                  );
                }}
                className="h-10 font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow hover:text-black duration-300 mt-2"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Products;
