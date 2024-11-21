import { NextResponse } from "next/server";
import { createPreference } from "@/services/mercadoPago";

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