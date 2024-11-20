import Category from "./model";


class CategoryDao {
  async getCategories() {
    try {
      return await Category.find();
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async getCategoryById(id: string) {
    try {
      return await Category.findById(id).populate("subCategories.id", "name");
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async createCategory(category: { name: string; subCategories?: { id: string }[] }) {
    try {
      const newCategory = await Category.create({
        name: category.name,
        subCategories: category.subCategories || [], // si no hay subcategorías genera array vacio
      });
      return newCategory;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
 
  // este metodoa gregar Subcategorias a una categoria existente
  async addSubCategoriesToCategory(categoryId: string, subCategoryIds: { id: string }[]) {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { $push: { subCategories: { $each: subCategoryIds } } },
        { new: true }
      );
      return updatedCategory;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async updateCategory(id: string, update: object, options = { new: true }) {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(id, update, options);
      return updatedCategory;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async deleteCategory(id: string) {
    try {
      return await Category.findByIdAndDelete(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  
}

const categoryDao = new CategoryDao();

export default categoryDao;
