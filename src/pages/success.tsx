import { resetCart } from "@/store/nextSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

/**
 * Composant pour afficher une page de réussite après un achat.
 */
const SuccessPage = () => {
  const dispatch = useDispatch();

  // Réinitialise le panier une fois la commande terminée
  useEffect(() => {
    dispatch(resetCart());
  }, [dispatch]);

  return (
    <div className="flex flex-col h-[800px] mdl:h-screen gap-2 items-center pt-64 pb-20">
      <h1 className="text-xl text-hoverBg font-semibold">
        Merci pour votre achat ! 🎉
      </h1>
      <Link
        className="text-lg text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-blue-600 duration-300"
        href={"/"}
        onClick={() => dispatch(resetCart())}
      >
        <p>Continuer vos achats</p>
      </Link>
    </div>
  );
};

export default SuccessPage;
