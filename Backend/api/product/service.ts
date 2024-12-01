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
    try {
      const products = await getProductByUserId(id);
      return products;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async createProduct(productData: IProduct, files: Express.Multer.File[]) {
    try {
      const uploadResults = await Promise.all(
        files.map((file) =>
          cloudinary.uploader.upload(file.path, { folder: 'products' })
        )
      );
  
    files.forEach((file) => fs.unlinkSync(file.path));
  
    const imageUrls = uploadResults.map((result) => result.secure_url);

    const product = {
      ...productData,
      image: imageUrls, 
    };

      console.log('Product input to save service:', product);
  
      return await createProduct(product);
    } catch (error) {
      console.error('Error in service:', error);
      throw new Error((error as Error).message);
    }
  }

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
