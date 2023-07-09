import { resetFavoriteData } from "@/store/nextSlice";
import { useDispatch } from "react-redux";

const ResetFavoriteItems = () => {
  const dispatch = useDispatch();
  const handleResetCart = () => {
    const confirmReset = window.confirm(
      "Êtes-vous sûr de vouloir réinitialiser vos articles du panier ?"
    );
    if (confirmReset) {
      dispatch(resetFavoriteData());
    }
  };
  return (
    <button
      onClick={handleResetCart}
      className="w-44 h-10 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white duration-300"
    >
      Tout supprimer
    </button>
  );
};

export default ResetFavoriteItems;
