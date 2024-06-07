export interface Category {
  id: string;
  name: string;
  assets: {
    source: string;
  };
}

export interface Product {
  featuredAsset: {
    source: string;
  };
  description: string;
  variants: {
    priceWithTax: number;
    stockLevel: number;
    sku: string;
  }
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber?: string | null;
}

export interface OrderLine {
  __typename?: "OrderLine" | undefined;
  id: string;
  unitPrice: number;
  quantity: number;
  featuredAsset?: {
    __typename?: "Asset" | undefined;
    source: string;
  } | null | undefined;
  productVariant: {
    name: string;
    priceWithTax?: number | undefined;
  };
  proratedUnitPriceWithTax: number;
  discounts: {
    amountWithTax: number;
  }[];
}

export interface Address {
  id: number;
  fullName: string;
  company: string;
  streetLine1: string;
  city: string;
  province: string;
  postalCode: string;
  country: {
    name: string;
    code: string;
  };
  phoneNumber: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
}