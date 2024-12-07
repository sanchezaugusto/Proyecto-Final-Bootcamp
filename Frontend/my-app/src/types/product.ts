// types.ts
export type Product = {
    _id: string;
    name: string;
    price: number;
    category?: string;
    description: string;
    image: string[];
    quantity: number;
};

