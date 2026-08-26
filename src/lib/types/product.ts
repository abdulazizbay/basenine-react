import {
  ProductCollection,
  ProductOrder,
  ProductStatus,
} from "../enums/product.enum";
import type { Team } from "./team";
import { Direction } from "./common";

export interface Product {
  _id: string;
  productStatus: ProductStatus;
  productCollection: ProductCollection;
  teamId?: string | Team;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Products {
  list: Product[];
  metaCounter: { total: number }[];
}

export interface ProductInquiry {
  order: ProductOrder;
  direction: Direction;
  page: number;
  limit: number;
  productCollection?: ProductCollection;
  teamId?: string;
  search?: string;
}
