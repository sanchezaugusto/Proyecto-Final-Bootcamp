import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    
    <div
      onClick={handleClick}
      className="h-[600px] bg-white py-8 px-4 border border-gray-300 rounded-2xl flex flex-col items-center justify-between text-slate-900 shadow-xl gap-4"
    >
      <div className="flex flex-col justify-center items-center gap-4">

        <figure className="w-full h-[230px] overflow-hidden cursor-pointer">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain transition-all hover:scale-110"
            />
        </figure>


        <h2 className="mt-2h-[40px] w-[300px] truncate line-clamp-3 font-bold text-lg md:text-xl text-center">
          {product.title}
        </h2>

        <p className="max-w-[280px] h-[100px] text-gray-500 text-sm md:text-base text-center line-clamp-3">
          {truncateText(product.description, 60)}
        </p>
        
        <p className="font-bold text-center text-xl">Precio: ${product.price}</p>
      
      </div>

    </div>
  );
};

export default ProductCard;