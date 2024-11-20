import { Schema, model } from "mongoose";

const SubCategorySchema = new Schema({
    name: {
      type: String,
      required: true,
    },
  });

const SubCategory = model("SubCategory", SubCategorySchema);

export default SubCategory