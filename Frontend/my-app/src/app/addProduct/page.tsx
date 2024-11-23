import ProductForm from "./product-form";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add a New Product</h1>
        <ProductForm />
      </div>
    </main>
  );
}
