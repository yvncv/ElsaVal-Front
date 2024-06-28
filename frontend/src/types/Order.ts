export type Order = {
    id: number;
    client: {
      id: number;
      user: {
        id: number;
        name: string;
        email: string;
      };
      contact_number: string;
      street_address: string;
    };
    identifier: string;
    uuid: string;
    subtotal_price: string;
    delivery_price: string | null;
    discount: number | null;
    total_price: string;
    street_address: string;
    status: string;
    contact_number: string;
    details: string;
    products: {
      id: number;
      product: {
        id: number;
        name: string;
        description: string;
        images: string[];
        cost_price: string;
        price: string;
        discount: number | null;
        sku: string;
        stock: number;
        status: string;
        created_at: string;
        updated_at: string;
      };
      unit_price: string;
      quantity: number;
      total_price: string;
    }[];
    created_at: string;
    updated_at: string;
  }