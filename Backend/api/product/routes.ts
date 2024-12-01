import express from "express";
import { productController } from "./controller";
import upload from '../../middlewares/multer';

const { getProduct, getProducts, createProduct, deleteProduct, editProduct, getProductByUserId } =
  productController;

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.get("/myProducts/:id", getProductByUserId);
productRouter.post("/addProduct", upload.array('image', 5), createProduct);
productRouter.delete("/deleteProduct/:id", deleteProduct);
productRouter.put("/editProduct/:id", editProduct);

export default productRouter;
