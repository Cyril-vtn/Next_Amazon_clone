import Banner from "@/components/Banner";
import Products from "@/components/Products";
import { ProductProps } from "../../type";

interface Props {
  products: ProductProps;
}

/**
 * Rend la page d'accueil avec une bannière et une liste de produits.
 *
 * @param {Props} props - Les props du composant.
 * @param {Product[]} props.products - La liste des produits à afficher.
 * @returns {JSX.Element} La page d'accueil rendue.
 */
export default function Home({ products }: Props) {
  return (
    <main>
      <div className=" mx-auto">
        <Banner />
        <div className="relative md:-mt-20 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
          <Products products={products} />
        </div>
      </div>
    </main>
  );
}

// SSR for data fetching

/**
+ * Récupère les produits côté serveur.
+ * @returns {Promise<{props: {products: any}}>}: Les produits récupérés.
+ */
export async function getServerSideProps() {
  // Récupérer les produits depuis le serveur
  const res = await fetch("https://fakestoreapiserver.reactbd.com/tech");
  // Convertir la réponse en JSON
  const products = await res.json();

  // Retourner les produits récupérés
  return {
    props: {
      products,
    },
  };
}
