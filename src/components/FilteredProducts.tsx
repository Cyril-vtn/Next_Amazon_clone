/* eslint-disable @next/next/no-img-element */
import React from "react";
import FormattedPrice from "./FormattedPrice";
import Image from "next/image";

interface Props {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: number;
  price: number;
  title: string;
  _id: number;
}
type Item = {
  item: Props;
};

const FilteredProducts = ({ item }: Item) => {
  return (
    <div className="flex w-full items-center gap-4 hover:bg-gray-300">
      <img className="w-10 xs:w-20" src={item.image} alt="productImage" />
      <div>
        <p className="text-xs -mb-1">
          {item.brand}_{item.category}
        </p>
        <p className="text-mdl font-medium">{item.title}</p>
        {/* <p className="text-xs">{item.description.substring(0, 100)}</p> */}
        <p className="text-sm flex items-center gap-1">
          price:{" "}
          <span className="font-semibold">
            <FormattedPrice amount={item.price} />
          </span>
          <span className="text-gray-600 line-through">
            <FormattedPrice amount={item.oldPrice} />
          </span>
        </p>
      </div>
      {/* <div className="flex-1 text-right px-4">
        <p className="text-base font-semibold animate-bounce text-amazon_blue">
          - <FormattedPrice amount={item.oldPrice - item.price} />
        </p>
      </div> */}
    </div>
  );
};

export default FilteredProducts;
