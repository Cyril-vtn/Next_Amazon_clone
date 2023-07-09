import React from "react";
import { SiMediamarkt } from "react-icons/si";
import FormattedPrice from "./FormattedPrice";
import { useSelector, useDispatch } from "react-redux";
import { StateProps, StoreProduct } from "../../type";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
//* Next Auth

/**
 * Composant pour afficher la section de paiement du panier.
 *
 * Ce composant calcule le montant total des produits dans le panier et gère le processus de paiement avec Stripe.
 */
const CartPayment = () => {
  const { productData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );

  const [total, setTotal] = useState(0);

  /**
   * Calcule le montant total des produits dans le panier.
   */
  useEffect(() => {
    let amount = 0;
    productData.forEach((item: StoreProduct) => {
      amount += item.price * item.quantity;
    });
    setTotal(amount);
  }, [productData]);

  //  récupérer la session
  const { data: session } = useSession();

  //  charger stripe
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  /**
   * Gère le processus de paiement.
   */
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: productData, email: session?.user?.email }),
    });
    const checkoutSession = await response.json();

    //  rediriger vers la page de paiement
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    if (result?.error) alert(result?.error.message);
  };

  return (
    <div className="flex flex-col gap-4  w-64 ">
      <div className="flex gap-2">
        <span className="bg-green-600 rounded-full p-1 h-6 w-6 text-sm text-white flex items-center justify-center mt-1">
          <SiMediamarkt />
        </span>
        <p className="text-sm">
          Votre commande est admissible à la livraison gratuite en choisissant
          cette option à lors du paiement
        </p>
      </div>
      <p className="flex items-center justify-center px-2 font-semibold">
        Total:{" "}
        <span className="font-bold text-xl">
          <FormattedPrice amount={total} />
        </span>
      </p>
      {userInfo ? (
        <div className="flex flex-col items-center">
          <button
            onClick={handleCheckout}
            className="w-full h-10 text-sm font-semibold bg-amazon_blue text-white rounded-lg hover:bg-amazon_yellow hover:text-black duration-300"
          >
            Acheter maintenant
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button className="w-full h-10 text-sm font-semibold bg-amazon_blue bg-opacity-50 text-white rounded-lg cursor-not-allowed">
            Acheter maintenant
          </button>
          <p className="text-xs mt-3 text-red-500 font-semibold text-center ">
            <span
              onClick={() => signIn()}
              className="underline cursor-pointer hover:text-amazon_blue transition-colors duration-300"
            >
              Connectez-vous
            </span>{" "}
            pour continuer
          </p>
        </div>
      )}
    </div>
  );
};

export default CartPayment;
