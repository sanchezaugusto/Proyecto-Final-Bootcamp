import Image from "next/image";

type FeatureProps = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

const Feature: React.FC<FeatureProps> = ({ src, alt, title, description }) => (
  <div className="flex flex-col justify-center items-center bg-white shadow-md p-6 rounded-lg">
    <Image
      src={src}
      alt={alt}
      width={200}
      height={200}
      className="grayscale hover:grayscale-0 transition"
    />
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const FeaturesSection: React.FC = () => {
  const features: FeatureProps[] = [
    {
      src: "/camionetaEnvio.png",
      alt: "Envíos a Todo el País",
      title: "Envíos a Todo el País",
      description: "Recibe tus compras rápidamente en cualquier rincón del país.",
    },
    {
      src: "/pagar.png",
      alt: "Múltiples Medios de Pago",
      title: "Múltiples Medios de Pago",
      description:
        "Paga con tarjeta de crédito, débito, efectivo o mercado pago.",
    },
    {
      src: "/oferta.png",
      alt: "Ofertas Diarias",
      title: "Ofertas Diarias",
      description:
        "Descubre descuentos nuevos todos los días en nuestras categorías.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">¿Por qué elegirnos?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              src={feature.src}
              alt={feature.alt}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
