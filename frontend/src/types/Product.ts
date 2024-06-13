export type Product = {
    id: number;
    name: string;
    description: string;
    images: string[];
    cost_price: string;
    price: string;
    discount: null | number;
    sku: string;
    stock: number;
    status: string;
    category: {
      id: number;
      name: string;
    };
    material: {
      id: number;
      name: string;
      description: null | string;
      quantity: number;
      unit_price: string;
    }; 
    created_at: string;
    updated_at: string;
  }