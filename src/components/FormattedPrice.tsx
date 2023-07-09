import React from "react";
interface Props {
  amount: number;
}

/**
+ * Formate le montant donné en tant que chaîne de caractères de devise localisée au format français.
+ *
+ * @param {number} amount - Le montant à formater.
+ * @returns {string} - Le montant formaté en tant que chaîne de caractères.
+ */
const FormattedPrice = ({ amount }: Props): JSX.Element => {
  // Formate le montant en tant que chaîne de caractères de devise localisée
  const formattedAmount = new Number(amount).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  // Retourne le montant formaté enveloppé dans un élément <span>
  return <span>{formattedAmount}</span>;
};

export default FormattedPrice;
