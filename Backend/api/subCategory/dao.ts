import { ISubCategory } from "../../types";
import SubCategory from "./model";

class SubCategoryDao{
    async getSubCategories() {
        try {
          return await SubCategory.find();
        } catch (error) {
          throw Error((error as Error).message);
        }
      }
      async getSubCategoryById(id: string) {
        try {
          return await SubCategory.findById(id)
        } catch (error) {
          throw new Error((error as Error).message);
        }
      }
    async createSubCategory(subCategory: { name: string }) {
        try {
          const newSubCategory = await SubCategory.create(subCategory);
          return newSubCategory;
        } catch (error) {
          throw new Error((error as Error).message);
        }
      }
      async updateSubCategory(id: string, subCategory: ISubCategory) {
        try {
          const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, subCategory, {
            new: true,
          });
          return updatedSubCategory;
        } catch (error) {
          throw Error((error as Error).message);
        }
      }
      async deleteSubCategory(id: string) {
        try {
          const deletedSubCategory = await SubCategory.findByIdAndDelete(id);
          return deletedSubCategory;
        } catch (error) {
          throw new Error((error as Error).message);
        }
      }
}

const subCategoryDao = new SubCategoryDao();

export default subCategoryDao