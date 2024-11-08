import categoryDao from "./dao";

const { getCategories, createCategory, updateCategory, deleteCategory } =
  categoryDao;

class CaterogySercice {
  async getCategories() {
    try {
      return await getCategories();
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async createCategory(category: string) {
    try {
      return await createCategory(category);
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async updateCategory(id: string, category: string) {
    try {
      return await updateCategory(id, category);
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
  async deleteCategory(id: string) {
    try {
      return await deleteCategory(id);
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

const categoryService = new CaterogySercice();

export default categoryService;
