import { NextResponse } from "next/server";
import { createPreference } from "@/services/mercadoPago";
//import { MercadoPagoConfig } from "mercadopago";

export async function POST(request: Request) {
  try {
    const { items } = await request.json();
    const initPoint = await createPreference(items);
    return NextResponse.json({ url: initPoint });
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    return NextResponse.json({ error: "Error al generar la preferencia de pago" }, { status: 500 });
  }
}

//const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
//
// export async function GET(request: Request) {
//   try {
//     const params = new URL(request.url).searchParams;
//     const topic = params.get("topic");
//     const id = params.get("id") || params.get("data.id");

//     if (topic === "payment") {
//       // Consultar directamente el endpoint REST
//       const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
//         headers: {
//           Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
//         },
//       });

//       if (!response.ok) {
//         console.error("Error al obtener los detalles del pago:", await response.text());
//         throw new Error("Error al obtener los detalles del pago");
//       }

//       const payment = await response.json();

//       if (payment.status === "approved") {
//         // Preparar datos para enviar al backend
//         const orderData = {
//           userId: payment.payer.id,
//           products: payment.additional_info.items.map((item: any) => ({
//             product_id: item.id,
//             quantity: item.quantity,
//             sub_total: item.unit_price * item.quantity,
//           })),
//           totalPrice: payment.transaction_amount,
//         };

//         // Enviar la orden al backend
//         const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/orders/confirmOrder`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(orderData),
//         });

//         if (!backendResponse.ok) {
//           console.error("Error al guardar la orden:", await backendResponse.text());
//           throw new Error("Error al guardar la orden");
//         }

//         console.log("Orden creada exitosamente en el backend");
//       }
//     }

//     return NextResponse.json({ message: "Webhook procesado exitosamente" });
//   } catch (error) {
//     console.error("Error procesando el webhook:", error);
//     return NextResponse.json({ error: "Error en el webhook" }, { status: 500 });
//   }
// }