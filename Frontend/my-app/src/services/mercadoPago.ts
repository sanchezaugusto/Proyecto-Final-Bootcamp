import { MercadoPagoConfig, Preference } from "mercadopago";

const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

interface MercadoPagoItem {
  id: string
  title: string;
  quantity: number;
  unit_price: number;
}

export async function createPreference(items: MercadoPagoItem[]) {
    try {
      const preference = await new Preference(mercadopago).create({
        body: {
          items,
          back_urls: {
            success: "http://localhost:3000/success",
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending",
          },
          auto_return: "approved", // Redirige automáticamente al success en caso de pago aprobado
        },
      });
  
      return preference.init_point; // URL de pago
    } catch (error) {
      console.error("Error al crear la preferencia de pago:", error);
      throw new Error("No se pudo generar la preferencia de pago");
    }
  }
  