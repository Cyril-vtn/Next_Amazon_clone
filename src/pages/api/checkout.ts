import { NextApiRequest, NextApiResponse } from "next";
import { StoreProduct } from "../../../type";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * Cette fonction gère la requête API et crée une session de paiement
 * L'ID de session est retourné dans la réponse.
 *
 * @param req - L'objet de requête API.
 * @param res - L'objet de requête API.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extraire les propriétés 'items' et 'email' du corps de la requête
  const { items, email } = req.body;

  // Créer un tableau d'articles modifiés avec la structure requise pour 'line_items'
  const modifiedItems = items.map((item: StoreProduct) => ({
    quantity: item.quantity,
    price_data: {
      currency: "eur",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
      },
    },
  }));

  // Créer une session de paiement en utilisant l'API Stripe
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["BD", "US", "OM", "CA", "GB", "FR"],
    },
    line_items: modifiedItems,
    mode: "payment",
    success_url: `${process.env.NEXTAUTH_URL}/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item: any) => item.image)),
    },
  });

  // Envoyer l'ID de session dans la réponse
  res.status(200).json({
    id: session.id,
  });
}
