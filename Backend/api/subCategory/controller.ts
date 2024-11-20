import { Request, Response } from "express";
import subcategoryService from "./service";


const {createSubCategory, getSubCategoryById, getSubCategories, updateSubCategory, deleteSubCategory } = subcategoryService

class SubCategoryController {
    async getSubCategories(req: Request, res: Response) {
      try {
        const subCategories = await getSubCategories();
        res.status(200).json(subCategories);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    }
    // solamente recibe el name
    async createCategory(req: Request, res: Response) {
      try {
        const subCategory = req.body;
        const newSubCategory = await createSubCategory( subCategory );
        res.status(201).json(newSubCategory);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    }
    async createSubCategory(req: Request, res: Response) {
      try {
        const { name } = req.body;
        // // hace q funcione porq valida el nombre
        // if (!name) {
        //   return res.status(400).json({ error: "El campo 'name' es obligatorio." });
        // }
        const newSubCategory = await createSubCategory({ name });
        res.status(201).json(newSubCategory);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    }
    async updateSubCategory(req: Request, res: Response) {
      try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedSubCategory = await updateSubCategory(id, name);
        res.status(200).json(updatedSubCategory);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    }
    async deleteSubCategory(req: Request, res: Response) {
      try {
        const { id } = req.params;
        const deletedSubCategory = await deleteSubCategory(id);
        res.status(200).json(deletedSubCategory);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    }
  }
  
  const subCategoryController = new SubCategoryController();
  
  export default subCategoryController;