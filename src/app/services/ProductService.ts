import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry, Products } from "../../lib/types/product";

class ProductService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  public async getProducts(input: ProductInquiry): Promise<Products> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&direction=${input.direction}&page=${input.page}&limit=${input.limit}`;

      if (input.productCollection) url += `&productCollection=${input.productCollection}`;
      if (input.teamId) url += `&teamId=${input.teamId}`;
      if (input.search) url += `&search=${input.search}`;

      const result = await axios.get(url);
      return result.data;
    } catch (err) {
      console.log("ERROR:", err);
      throw err;
    }
  }

  public async getProduct(productId: string): Promise<Product> {
    try {
      const url = `${this.path}/product/${productId}`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data.result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default ProductService;
