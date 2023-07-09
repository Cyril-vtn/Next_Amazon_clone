import React from "react";
import { useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../../type";
import FavoriteProduct from "@/components/FavoriteProduct";
import ResetFavoriteItems from "@/components/ResetFavoriteItems";
import Link from "next/link";

const FavoritePage = () => {
  const { favoriteData } = useSelector((state: StateProps) => state.next);

  return (
    <div className="max-w-screen-xl md:mb-96 mx-auto px-6 gap-10 pt-5 pb-96">
      {favoriteData.length > 0 ? (
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
            <p className="text-2xl font-semibold text-amazon_blue">
              Favorte Items
            </p>
          </div>
          <div>
            {favoriteData.map((item: StoreProduct) => (
              <div key={item._id} className="mt-2">
                <FavoriteProduct item={item} />
              </div>
            ))}
            <ResetFavoriteItems />
          </div>
        </div>
      ) : (
        <div className="bg-white h-96  flex flex-col items-center justify-center py-5 rounded-lg shadow-lg">
          <h1>Vous n'avez pas encore de favoris</h1>
          <Link href="/">
            <button className="w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold hover:bg-amazon_yellow hover:text-black duration-300 mt-2">
              Acceder à la boutique
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
