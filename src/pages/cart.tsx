import React from "react";
import { useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../../type";
import CartProduct from "@/components/CartProduct";
import ResetCart from "@/components/ResetCart";
import Link from "next/link";
import CartPayment from "@/components/CartPayment";

/**
 * Rend le composant Cart.
 * @returns JSX.Element
 */
const Cart = () => {
  // Obtenir productData depuis le store Redux
  const { productData } = useSelector((state: StateProps) => state.next);

  // Rendre le composant Cart
  return (
    <div className="max-w-screen-2xl h-full  mx-auto px-6 flex justify-center items-center mdl:items-start pt-10 mb-96  gap-10 pb-32">
      {productData.length > 0 ? (
        <div className="w-full h-full  xl:flex gap-10">
          {/* Rendre les articles du panier */}
          <div className="bg-white col-span-4 p-4 rounded-lg flex-2">
            <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
              <p className="text-2xl font-semibold text-amazon_blue">
                Votre panier
              </p>
              <p className="hidden :block text-lg font-semibold text-amazon_blue">
                Prix total
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              {/* Rendre chaque article */}
              {productData.map((item: StoreProduct) => (
                <div key={item._id}>
                  <CartProduct item={item} />
                </div>
              ))}
              {/* Rendre le bouton de réinitialisation du panier */}
              <ResetCart />
            </div>
          </div>
          {/* Rendre le composant de paiement du panier */}
          <div className="bg-white h-64 flex-1 w-full col-span-1 p-4 rounded-lg flex items-center justify-center mt-4 xl:mt-0 ">
            <CartPayment />
          </div>
        </div>
      ) : (
        <div className="bg-white h-[500px] w-full gap-2 col-span-5 flex flex-col items-center justify-center py-5 rounded-lg shadow-lg">
          {/* Rendre le message de panier vide */}
          <h1 className="text-lg font-medium">Votre panier est vide</h1>
          {/* Rendre le lien vers la boutique */}
          <Link href={"/"}>
            <button className="w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold hover:bg-amazon_yellow duration-300">
              Acceder à la boutique
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
