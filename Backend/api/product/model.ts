import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  subCategory_id:{
    type: Schema.Types.ObjectId,
    ref: "Category",
   // required: true,
    required: false,
  },
  salers_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  image: {
   type: [String],
    required: true,
  },
});

const Product = model("Product", productSchema);

export default Product;
