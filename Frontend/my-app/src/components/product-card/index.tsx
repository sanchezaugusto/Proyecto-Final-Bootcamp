import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import AddToCartButton from "../buttons/add-cart-button/AddToCartButton";

interface ProductCardProps {
  product: Product,
  addToCart: (product: Product) => void;
}


const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/products/${product._id}`);
  };
  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div onClick={handleClick} className="max-w-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer flex flex-col justify-between">
  
      <div className="overflow-hidden">
        {product.image? (        
          <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-64 p-4 object-contain bg-white transition-all hover:scale-110"
        />):(
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
        )}

      </div>

      <div className="flex flex-col p-6 gap-6">
        <div>
          <p className="font-bold text-xl mb-2">{product.name}</p>
          <p className="text-gray-700 text-base">{truncateText(product.description, 60)}</p>
        </div>

        <div className="">
          <span className="text-gray-900 font-bold text-lg">Price ${product.price}</span>
        </div>

      </div>
        {/* <div className="flex justify-start">
          <AddToCartButton onClick={() => {addToCart}}/>
        </div> */}
    </div>
  );
};

export default ProductCard;