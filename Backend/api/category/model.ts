import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subCategories: [
    {
      id: {
        type: Schema.Types.ObjectId, // referencia a SubCategory q esta abajo
        ref: "SubCategory",
        //required: true,
      },
    },
  ],
});


const Category = model("Category", CategorySchema);

export default Category;