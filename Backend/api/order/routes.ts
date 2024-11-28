import express from "express";
import orderController from "./controller";

const orderRouter = express.Router();
const { createOrder, getOrdersByUserId, getOrderById, getOrdersBySellerId, getTotalSold, getAmountByProductsSold } = orderController;

orderRouter.get("/:id", getOrderById);
orderRouter.get("/ordersHistory/:id", getOrdersByUserId);
orderRouter.post("/confirmOrder", createOrder);
orderRouter.get("/salesHistory/:id", getOrdersBySellerId);
orderRouter.get("/totalSold/:id", getTotalSold);
orderRouter.get("/amountProductsSold/:id", getAmountByProductsSold);

export default orderRouter;
