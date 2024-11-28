import ProductForm from "./product-form";
import './page.css'

import { FaBoxOpen } from "react-icons/fa"; // Usa react-icons para los íconos modernos

export default function Page() {
  return (
    <main className="main-add-products container mx-auto flex items-center justify-center">

      <figure>
        <img src="/addProduct/addProduct.PNG" alt="addProductImage" className="h-full w-full"/>
      </figure>

      
      <div className="main-add-products-form w-max h-max container mx-auto p-10 bg-white rounded-lg flex flex-col items-center gap-4">

        <h1 className="flex items-center gap-2 text-2xl font-bold mb-4 w-full">
          {/* <div className="size-8">
            
            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 512 512" viewBox="0 0 512 512" id="add">
              <g>
                <circle cx="256" cy="256" r="216.8" fill="#2a2a2a"></circle>
                <polygon fill="#f2f2f2" points="406.5 220.1 291.9 220.1 291.9 105.5 220 105.5 220 220.1 105.4 220.1 105.4 291.9 220 291.9 220 406.6 291.9 406.6 291.9 291.9 406.5 291.9"></polygon>
              </g>
            </svg>
          </div> */}
          <FaBoxOpen className="text-3xl text-gray-900 mr-2 animate-pulse" /> Add a New Product
        </h1>

        <ProductForm />
      </div>

    </main>
  );
}
