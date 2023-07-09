import { resetCart } from "@/store/nextSlice";
import React from "react";
import { useDispatch } from "react-redux";

/**
 * Composant ResetCart.
 * Rend un bouton qui, lorsqu'il est cliqué, déclenche l'action resetCart.
 */
const ResetCart = () => {
  const dispatch = useDispatch();

  /**
   * Gère l'événement de clic sur le bouton de réinitialisation.
   * Demande confirmation à l'utilisateur et déclenche l'action resetCart si confirmé.
   */
  const handleResetCart = () => {
    const confirm = window.confirm("Voulez-vous supprimer tous les produits ?");
    if (confirm) {
      dispatch(resetCart());
    }
  };

  return (
    <button
      onClick={handleResetCart}
      className="w-44 h-10 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hover:tet-white duration-300"
    >
      Tout supprimer
    </button>
  );
};

export default ResetCart;
