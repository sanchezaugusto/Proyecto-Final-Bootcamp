import express from "express";
import { cartController } from "./controller";

import { authRoutes } from "../../middlewares/authRoutes";

const { addCart, getCarts } = cartController;
const cartRouter = express.Router();

cartRouter.use(authRoutes);

cartRouter.get("/getCarts", getCarts);
//cartRouter.get("/getCart/:id", (req, res) => {});
cartRouter.post("/addCart", addCart);
//cartRouter.post("/confirmCart", (req, res) => {});
cartRouter.put("/updateCart/:id", (req, res) => {});
cartRouter.delete("/deleteCart/:id", (req, res) => {});

export default cartRouter;
