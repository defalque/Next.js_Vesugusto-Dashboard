import { OrderInfo, Product } from "@/app/_lib/definitions";
// import * as motion from "motion/react-client";

type ItemsListFallbackProps = {
  items: Product[] | OrderInfo[];
  variation: "prodotto" | "ordine";
};

function ItemsListFallback({ items, variation }: ItemsListFallbackProps) {
  if (!Array.isArray(items)) {
    return (
      <tbody>
        <tr>
          <td
            // key="fallback"
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, y: 20 }}
            colSpan={variation === "prodotto" ? 6 : 7}
            className="px-6 py-4 text-center text-red-500"
          >
            Errore: dati {variation === "prodotto" ? "prodotti" : "ordini"} non
            validi.
          </td>
          {/* <motion.td
            key="fallback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            colSpan={variation === "prodotto" ? 6 : 7}
            className="px-6 py-4 text-center text-red-500"
          >
            Errore: dati {variation === "prodotto" ? "prodotti" : "ordini"} non
            validi.
          </motion.td> */}
        </tr>
      </tbody>
    );
  }

  if (items.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            // key="fallback"
            // initial={{ opacity: 0, y: 20 }}
            // animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, y: 20 }}
            colSpan={variation === "prodotto" ? 6 : 7}
            className="px-6 py-4 text-center"
          >
            Nessun {variation === "prodotto" ? "prodotto" : "ordine"} trovato.
          </td>
          {/* <motion.td
            key="fallback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            colSpan={variation === "prodotto" ? 6 : 7}
            className="px-6 py-4 text-center"
          >
            Nessun {variation === "prodotto" ? "prodotto" : "ordine"} trovato.
          </motion.td> */}
        </tr>
      </tbody>
    );
  }

  // If items are valid and have content, return null (let parent component handle rendering)
  return null;
}

export default ItemsListFallback;
