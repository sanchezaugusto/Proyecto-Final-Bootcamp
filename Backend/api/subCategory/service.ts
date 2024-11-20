import { ISubCategory } from "../../types";
import subCategoryDao from "./dao";

const {getSubCategories,  getSubCategoryById, createSubCategory, updateSubCategory, deleteSubCategory} = subCategoryDao

class SubCaterogySercice{
    async getSubCategories() {
        try {
          const subCategories = await getSubCategories()
          return subCategories;
        } catch (error) {
          throw new Error((error as Error).message);
        }
      }
      async getSubCategoryById(id: string){
        try {
          const getSubCategory = await getSubCategoryById(id)
          return getSubCategory
        } catch (error) {
            throw Error((error as Error).message);
        }
      }

    async createSubCategory(subCategory: { name: string }) {
        try {
          const newSubCategory = await createSubCategory(subCategory);
          return newSubCategory;
        } catch (error) {
          throw new Error((error as Error).message);
        }
      }
      async updateSubCategory(id: string, subCategory: ISubCategory) {
        try {
          const updatedSubCategory = await updateSubCategory(id, subCategory);
          return updatedSubCategory;
        } catch (error) {
          throw Error((error as Error).message);
        }
      }

      async deleteSubCategory(id: string) {
        try {
          const deletedSubCategory = await deleteSubCategory(id);
          return deletedSubCategory;
        } catch (error) {
          throw new Error((error as Error).message);
        }
      }

}

const subCategoryService = new SubCaterogySercice()

export default subCategoryService