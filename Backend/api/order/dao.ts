import Order from "./model";
import Product from "../product/model";
import { IOrder } from "./types";
import mongoose from "mongoose";

class OrderDao {
  async getOrdersByUserId(userId: string) {
    try {
      const orderHistory = await Order.find({ user_id: userId });
      return orderHistory;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async createOrder(order: IOrder) {
    try {
      const newOrder = await Order.create(order);
      return newOrder;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getOrderById(id: string) {
    try {
      const order = await Order.findById(id);
      return order;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async findOrdersBySellerId(sellerId: string) {
    const { ObjectId } = mongoose.Types;
    try {
      const objectIdSellerId = new ObjectId(sellerId);  
      const productIds = await Product.find({ salers_id: objectIdSellerId }).select('_id');
  
      const orderHistory = await Order.aggregate([
        { $unwind: "$products" },
        {
          $match: {
            "products.product_id": { $in: productIds.map((product) => product._id) }
          }
        },
        {
          $lookup: {
            from: "products",
            localField: "products.product_id",
            foreignField: "_id",
            as: "productDetails"
          }
        },
        { $unwind: "$productDetails" },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "userDetails"
          }
        },
        { $unwind: "$userDetails" },
        {
          $group: {
            _id: "$_id",
            user_id: { $first: "$userDetails" },
            products: {
              $push: {
                id: "$products.product_id",
                quantity: "$products.quantity",
                sub_total: "$products.sub_total"
              }
            },
            createdAt: { $first: "$createdAt" }
          }
        },
        {
          $project: {
            "user_id._id": 1,
            "user_id.email": 1,
            "products.id": 1,
            "products.quantity": 1,
            "products.sub_total": 1,
            "createdAt": 1
          }
        }
      ]);
  
      return orderHistory;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

const orderDao = new OrderDao();

export default orderDao;
