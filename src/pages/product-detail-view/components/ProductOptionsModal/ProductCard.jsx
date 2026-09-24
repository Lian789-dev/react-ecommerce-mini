import { useParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";

export default function ProductCard() {
  const { id } = useParams();
  const getProductById = useProductStore((state) => state.getProductById);
  const product = getProductById(id);
  return (
    <div className="flex items-center gap-4 pb-4">
      <div className="w-40 overflow-hidden rounded-md bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover"
        />
      </div>
      <div>
        <p className="font-semibold text-green-800">
          Rp{product.price.toLocaleString("id-ID")}
        </p>
        <p className="text-sm text-slate-500">stock: {product.stock}</p>
      </div>
    </div>
  );
}
