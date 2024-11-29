import { Request, Response } from "express";
import orderService from "./service";
import { IOrder } from "./types";

const { createOrder, getOrdersByUserId, getOrderById, getOrdersBySellerId, getTotalSold, getAmountByProductsSold } = orderService;

class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      console.log("Datos recibidos en el backend:", req.body);
      const order: IOrder = req.body;
      const newOrder = await createOrder(order);
      res.status(200).json(newOrder);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async getOrdersByUserId(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const orders = await getOrdersByUserId(userId);
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const orderId = req.params.orderId;
      const order = await getOrderById(orderId);
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async getOrdersBySellerId(req: Request, res: Response) {
    try {
      const sellerId = req.params.id;
      const salesHistory = await getOrdersBySellerId(sellerId);
      res.status(200).json(salesHistory);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async getTotalSold(req: Request, res: Response){
    try {
      const sellerId = req.params.id;
      const totalSold = await getTotalSold(sellerId);
      res.status(200).json(totalSold);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async getAmountByProductsSold(req: Request, res: Response){
    try {
      const sellerId = req.params.id;
      const totalSold = await getAmountByProductsSold(sellerId);
      res.status(200).json(totalSold);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}

const orderController = new OrderController();

export default orderController;
