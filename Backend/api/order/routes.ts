import express from "express";
import orderController from "./controller";

const orderRouter = express.Router();
const { createOrder, getOrdersByUserId, getOrderById, getOrdersBySellerId } = orderController;

orderRouter.get("/:id", getOrderById);
orderRouter.get("/ordersHistory/:id", getOrdersByUserId);
orderRouter.post("/confirmOrder", createOrder);
orderRouter.get("/salesHistory/:id", getOrdersBySellerId);

export default orderRouter;
