import Image from "next/image";
import React, { use } from "react";
import FormattedPrice from "./FormattedPrice";
import { LuMinus, LuPlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "@/store/nextSlice";
interface Item {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: number;
  price: number;
  title: string;
  _id: number;
  quantity: number;
}

interface cartProductsProps {
  item: Item;
}

/**
 * Composant pour afficher un produit dans le panier.
 *
 * @param item - L'élément du produit à afficher.
 */
const CartProduct = ({ item }: cartProductsProps) => {
  const dispatch = useDispatch(); // Utilisez useDispatch pour modifier la quantité

  return (
    <div className="bg-gray-100 rounded-lg flex items-center flex-col gap-4 mdl:flex-row">
      <Image
        className="object-cover w-auto h-auto"
        width={150}
        height={150}
        src={item.image}
        alt="productImage"
      />
      <div className=" items-center md:flex px-2 gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-amazon_blue">{item.title}</p>
          <p className="text-xs text-gray-600 ">
            {item.description.substring(0, 120)}
          </p>
          <p className="text-sm text-gray-600">
            Prix unitaire:{" "}
            <span className="font-semibold text-amazon_blue">
              <FormattedPrice amount={item.price} />
            </span>
          </p>
          <div className="flex items-center md:gap-6 justify-center md:justify-normal flex-col md:flex-row">
            <div className="flex items-center justify-between  border border-gray-300 px-4 py-1 rounded-full w-28 shadow-lg shadow-gray-300 m-2 mdl:m-0 mdl:mt-1">
              <span
                onClick={() =>
                  dispatch(increaseQuantity({ ...item, quantity: 1 }))
                }
                className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
              >
                <LuPlus /> {/* Icône Plus */}
              </span>
              <span>{item.quantity}</span>
              <span
                onClick={() =>
                  dispatch(decreaseQuantity({ ...item, quantity: 1 }))
                }
                className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
              >
                <LuMinus /> {/* Icône Moins */}
              </span>
            </div>
            <div
              onClick={() => dispatch(deleteProduct(item._id))}
              className="flex items-center text-sm font-medium text-red-400 hover:text-red-600 cursor-pointer duration-300"
            >
              <IoMdClose className="mt-[2px]" /> <p>Supprimer</p>
            </div>
          </div>
        </div>
        <div className="text-lg font-semibold text-amazon_blue text-center mb-4 mt-4">
          <FormattedPrice amount={item.price * item.quantity} />
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
