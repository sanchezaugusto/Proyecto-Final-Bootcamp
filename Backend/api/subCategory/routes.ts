import express from "express";
import subCategoryController from "./controller";
import { adminRoutes } from "../../middlewares/adminRoutes";

const { getSubCategories, createSubCategory, updateSubCategory, deleteSubCategory} =
  subCategoryController;

const subCategoryRouter = express.Router();

subCategoryRouter.get("/", getSubCategories);

//categoryRouter.use(adminRoutes);

subCategoryRouter.post("/createSubCategory", createSubCategory);
subCategoryRouter.put("/updateSubCategory/:id", updateSubCategory);
subCategoryRouter.delete("/deleteSubCategory/:id", deleteSubCategory);

export default subCategoryRouter;
