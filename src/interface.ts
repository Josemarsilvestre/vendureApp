export interface Category {
  id: string;
  name: string;
  assets: {
    source: string;
  };
  children: {
    id: string;
    name: string;
    assets: {
      source: string;
    };
  };
  productVariants: {
    items: {
      product: {
        id: string;
        name: string;
        featuredAsset: {
          source: string;
        };
        description: string;
        variants: {
          priceWithTax: number;
          stockLevel: number;
          sku: string;
        };
      };
    };
  }[];
}

export interface Product {
  id: string;
  name: string;
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