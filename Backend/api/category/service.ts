import categoryDao from "./dao";

const { getCategoryById, getCategories, createCategory, addSubCategoriesToCategory, updateCategory, deleteCategory } =
  categoryDao;

class CaterogySercice {
  async getCategories() {
    try {
      const categories = await getCategories()
      return categories;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async getCategoryById(id: string){
    try {
      const getCategory = await getCategoryById(id)
      return getCategory
    } catch (error) {
        throw Error((error as Error).message);
    }
  }
  async createCategory(category: { name: string; subCategories?: { id: string }[] }) {
    try {
      const newCategory = await createCategory(category);
      return newCategory;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  
  async addSubCategoriesToCategory(categoryId: string, subCategoryIds: { id: string }[]) {
    try {
      const updatedCategory = await addSubCategoriesToCategory(categoryId, subCategoryIds);
      return updatedCategory;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async updateCategory(id: string, category: { name: string; subCategories?: { id: string }[] }) {
    try {
      const updatedCategory = await updateCategory(
        id,
        {
          name: category.name,
          ...(category.subCategories && { subCategories: category.subCategories }),
        }
      )
  
      return updatedCategory;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  async deleteCategory(id: string) {
    try {
      const deletedCategory = await deleteCategory(id);
      if (!deletedCategory) throw new Error("Categoría no encontrada");
      return deletedCategory;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  
}

const categoryService = new CaterogySercice();

export default categoryService;
