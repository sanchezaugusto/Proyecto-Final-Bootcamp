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

  async getTotalSold(id: string){
    console.log(id)
    try {
      const order = await Order.aggregate([

        // Desglosar los productos vendidos
        {
          $unwind: "$products",
        },
        // Hacer lookup para obtener información del producto
        {
          $lookup: {
            from: "products",
            localField: "products.product_id",
            foreignField: "_id",
            as: "product_info",
          },
        },
        // Aplanar la información del producto
        {
          $unwind: "$product_info",
        },
        // Filtrar por salers_id del vendedor
        {
          $match: {
            "product_info.salers_id": new mongoose.Types.ObjectId(id), // Reemplazar con el ID del vendedor
          },
        },
        // Proyectar la fecha en formato YYYY-MM-DD y calcular subtotal
        {
          $project: {
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            product_id: "$products.product_id",
            saler_id: "$product_info.salers_id",
            quantity: "$products.quantity",
            total_price: { $multiply: ["$products.quantity", "$product_info.price"] },
          },
        },
        // Agrupar por fecha
        {
          $group: {
            _id: "$date",
            total_sales: { $sum: "$total_price" },
            total_quantity: { $sum: "$quantity" },
          },
        },
        // Ordenar por fecha
        {
          $sort: { _id: 1 },
        },
      ]);
      return order
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getAmountByProductsSold(sellerId: string){
    try {
      const data = await Order.aggregate([
        // Desglosar los productos vendidos
        {
          $unwind: "$products",
        },
        // Hacer un lookup para obtener información del producto
        {
          $lookup: {
            from: "products", // Colección de productos
            localField: "products.product_id", // ID del producto en la orden
            foreignField: "_id", // ID del producto en la colección de productos
            as: "product_info",
          },
        },
        // Aplanar la información del producto
        {
          $unwind: "$product_info",
        },
        // Filtrar por el vendedor específico
        {
          $match: {
            "product_info.salers_id": new mongoose.Types.ObjectId(sellerId), // Reemplazar con el ID del vendedor
          },
        },
        // Agrupar por producto y sumar la cantidad vendida
        {
          $group: {
            _id: "$products.product_id", // Agrupar por el ID del producto
            product_name: { $first: "$product_info.name" }, // Mantener el nombre del producto
            total_quantity: { $sum: "$products.quantity" }, // Sumar la cantidad vendida
          },
        },
        // Ordenar por cantidad vendida (opcional)
        {
          $sort: { total_quantity: -1 }, // Descendente
        },
      ]);
      console.log(data)
      return data;
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
