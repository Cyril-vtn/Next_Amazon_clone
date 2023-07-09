import { LuMenu } from "react-icons/lu";
import { StateProps } from "../../../type";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import { removeUser } from "@/store/nextSlice";

/**
 * Composant pour l'en-tête inférieur.
 */
const BottomHeader = () => {
  const dispatch = useDispatch();

  /**
   * Gère l'action de déconnexion.
   */
  const handleSignOut = () => {
    const confirm = window.confirm("voulez-vous vous déconnecter ?");
    if (confirm) {
      signOut();
      dispatch(removeUser());
    }
  };

  const { userInfo } = useSelector((state: StateProps) => state.next);

  return (
    <div className="w-full h-10 bg-amazon_light text-sm text-white px-4 flex items-center">
      {/* Toutes */}
      <p className="flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <LuMenu className="text-xl" /> Toutes
      </p>

      {/* Deals du jour */}
      <p className="hidden mdl:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300 ">
        Deals du jour
      </p>

      {/* Acheter à nouveau */}
      {/* <p className="hidden mdl:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Acheter à nouveau
      </p> */}

      {/* Coupons */}
      {/* <p className="hidden mdl:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Coupons
      </p> */}

      {/* Idées cadeaux */}
      <p className="hidden mdl:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Idées cadeaux
      </p>

      {/* AmazonBasics */}
      <p className="hidden mdl:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        AmazonBasics
      </p>

      {/* Chèques-cadeaux */}
      <p className="hidden mdl:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Chèques-cadeaux
      </p>

      {/* Se déconnecter */}
      {userInfo ? (
        <button
          onClick={handleSignOut}
          className="inline-flex items-center h-8 px-2 border border-transparent hover:border-white text-amazon_yellow hover:text-white  cursor-pointer duration-300"
        >
          Se déconnecter
        </button>
      ) : null}
    </div>
  );
};
export default BottomHeader;
