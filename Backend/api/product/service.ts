import { IProduct } from "../../types";
import { ISearchParams } from "./types";
import { productDao } from "./dao";
import fs from "fs";
import cloudinary from "../../config/cloudinary";

const {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
  getProductByUserId,
} = productDao;

class ProductService {
  async getProduct(id: string) {
    try {
      const product = await getProductById(id);
      return product;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async getProducts(searchParams: ISearchParams) {
    const {
      category_id,
      subCategory_id,
      salers_id,
      filterByPrice,
      priceRange,
      page = "1",
      limit = "80",
      keyword
    } = searchParams;
    let priceStart: number | undefined;
    let priceEnd: number | undefined;
    let sort: -1 | 1 | undefined;
    if (filterByPrice) {
      sort = filterByPrice === "lower" ? 1 : -1;
    }
    if (priceRange) {
      const [start, end] = priceRange.split(",");
      priceStart = Number(start);
      priceEnd = Number(end);
    }
    try {
      const products = await getAllProducts(
        category_id,
        subCategory_id,
        salers_id,
        priceStart,
        priceEnd,
        sort,
        page,
        limit,
        keyword
      );

      return products;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getProductByUserId(id: string) {
    console.log('ID:', id); // Debug 
    try {
      const products = await getProductByUserId(id);
      return products;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async createProduct(productData: IProduct, files: Express.Multer.File[]) {
    try {
      // Subir la imagen a Cloudinary
      const uploadResults = await Promise.all(
        files.map((file) =>
          cloudinary.uploader.upload(file.path, { folder: 'products' })
        )
      );
  
    // Eliminar los archivos temporales después de subirlos
    files.forEach((file) => fs.unlinkSync(file.path));
  
    // Crear el producto con las URLs de las imágenes
    const imageUrls = uploadResults.map((result) => result.secure_url);

      // Preparar los datos del producto
    const product = {
      ...productData,
      image: imageUrls, // Agregar las URLs de las imágenes
    };

      console.log('Product input to save service:', product);
  
      // Guardar en la base de datos
      return await createProduct(product);
    } catch (error) {
      console.error('Error in service:', error);
      throw new Error((error as Error).message);
    }
  }

  // async createProduct(productData: IProduct, filePath: string) {
  //   try {
  //     // Subir la imagen a Cloudinary
  //     const uploadResult = await cloudinary.uploader.upload(filePath, {
  //       folder: 'products',
  //     });
  
  //     // Eliminar el archivo temporal
  //     fs.unlinkSync(filePath);
  
  //     // Preparar los datos del producto
  //     const product = {
  //       ...productData,
  //       image: uploadResult.secure_url, // Agregar la URL de la imagen
  //     };

  //     console.log('Product input to save service:', product);
  
  //     // Guardar en la base de datos
  //     return await createProduct(product);
  //   } catch (error) {
  //     console.error('Error in service:', error);
  //     throw new Error((error as Error).message);
  //   }
  // }

  // async createProduct(product: IProduct) {
  //   try {
  //     const newProduct = await createProduct(product);
  //     return newProduct;
  //   } catch (error) {
  //     throw Error((error as Error).message);
  //   }
  // }
  async editProduct(id: string, product: IProduct) {
    try {
      const updatedProduct = await editProduct(id, product);
      return updatedProduct;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async deleteProduct(id: string) {
    try {
      const deletedProduct = await deleteProduct(id);
      return deletedProduct;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const productService = new ProductService();
