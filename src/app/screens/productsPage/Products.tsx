import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom";
import { setProducts, setProductTotal, setTeamOptions } from "./slice";
import { retrieveProducts, retrieveProductTotal, retrieveTeamOptions } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { Team } from "../../../lib/types/team";
import { ProductCollection, ProductOrder } from "../../../lib/enums/product.enum";
import { Direction } from "../../../lib/types/common";
import ProductService from "../../services/ProductService";
import TeamService from "../../services/TeamService";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

const productsRetriever = createSelector(
  retrieveProducts,
  retrieveProductTotal,
  retrieveTeamOptions,
  (products, productTotal, teamOptions) => ({ products, productTotal, teamOptions }),
);

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
  setProductTotal: (data: number) => dispatch(setProductTotal(data)),
  setTeamOptions: (data: Pick<Team, "_id" | "teamNick">[]) => dispatch(setTeamOptions(data)),
});

const SORT_OPTIONS: { label: string; value: ProductOrder }[] = [
  { label: "Newest", value: ProductOrder.CREATED_AT },
  { label: "Price", value: ProductOrder.PRICE },
  { label: "Most Viewed", value: ProductOrder.VIEWS },
];

const COLLECTION_OPTIONS: { label: string; value?: ProductCollection }[] = [
  { label: "All", value: undefined },
  { label: "Jerseys", value: ProductCollection.JERSEYS },
  { label: "Shoes", value: ProductCollection.SHOES },
  { label: "Balls", value: ProductCollection.BALLS },
  { label: "Bags", value: ProductCollection.BAGS },
  { label: "Caps", value: ProductCollection.CAPS },
  { label: "Socks", value: ProductCollection.SOCKS },
  { label: "Water Bottles", value: ProductCollection.WATER_BOTTLES },
  { label: "Other", value: ProductCollection.OTHER },
];

function teamOf(value?: string | Team | null): Team | null {
  return value && typeof value === "object" ? value : null;
}

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

const LIMIT = 12;

export default function Products({ onAdd }: ProductsProps) {
  const { setProducts, setProductTotal, setTeamOptions } = actionDispatch(useDispatch());
  const { products, productTotal, teamOptions } = useSelector(productsRetriever);
  const history = useHistory();

  const [searchText, setSearchText] = useState<string>("");
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: LIMIT,
    order: ProductOrder.CREATED_AT,
    direction: Direction.DESC,
  });

  useEffect(() => {
    const team = new TeamService();
    team.getTeamOptions().then(setTeamOptions).catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => {
        setProducts(data.list);
        setProductTotal(data.metaCounter[0]?.total ?? 0);
      })
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProductSearch((prev) =>
        (prev.search ?? "") === searchText ? prev : { ...prev, page: 1, search: searchText },
      );
    }, 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  const handleSort = (order: ProductOrder) => {
    setProductSearch((prev) => ({ ...prev, page: 1, order }));
  };

  const toggleDirection = () => {
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      direction: prev.direction === Direction.DESC ? Direction.ASC : Direction.DESC,
    }));
  };

  const handleCollectionFilter = (collection?: ProductCollection) => {
    setProductSearch((prev) => ({ ...prev, page: 1, productCollection: collection }));
  };

  const handleTeamFilter = (value: string) => {
    setProductSearch((prev) => ({ ...prev, page: 1, teamId: value || undefined }));
  };

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setProductSearch((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageCount = Math.max(1, Math.ceil(productTotal / LIMIT));

  return (
    <div className="shop-list-page">
      <section className="shop-hero">
        <Box className="shop-hero-inner">
          <Box className="shop-hero-eyebrow">TEAM STORE</Box>
          <Box className="shop-hero-title">Shop</Box>
          <Box className="shop-hero-desc">
            Official gear from every team in the league — jerseys, caps, and everything in between.
          </Box>

          <Stack className="shop-toolbar" direction="row" flexWrap="wrap">
            <Stack className="shop-search" direction="row" alignItems="center">
              <SearchIcon />
              <input
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Stack>

            <Stack className="shop-controls" direction="row" alignItems="center" flexWrap="wrap">
              <select
                className="shop-team-filter"
                value={productSearch.teamId ?? ""}
                onChange={(e) => handleTeamFilter(e.target.value)}
              >
                <option value="">All Teams</option>
                {teamOptions.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.teamNick}
                  </option>
                ))}
              </select>

              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={productSearch.order === opt.value ? "sort-chip active" : "sort-chip"}
                  onClick={() => handleSort(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
              <button className="direction-toggle" onClick={toggleDirection}>
                <SwapVertIcon />
                {productSearch.direction === Direction.DESC ? "DESC" : "ASC"}
              </button>
            </Stack>
          </Stack>

          <Stack className="shop-collections" direction="row" flexWrap="wrap">
            {COLLECTION_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                className={
                  productSearch.productCollection === opt.value ? "sort-chip active" : "sort-chip"
                }
                onClick={() => handleCollectionFilter(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </Stack>
        </Box>
      </section>

      <section className="shop-grid-section">
        <Box className="shop-grid-inner">
          {products.length !== 0 ? (
            <Box className="shop-grid">
              {products.map((product: Product) => {
                const imagePath = product.productImages?.[0]
                  ? `${serverApi}/${product.productImages[0]}`
                  : "/icons/noimage-list.svg";
                const team = teamOf(product.teamId);
                const outOfStock = product.productLeftCount <= 0;
                return (
                  <Box
                    key={product._id}
                    className="shop-tile"
                    onClick={() => history.push(`/products/${product._id}`)}
                  >
                    <Box className="shop-tile-media">
                      <img src={imagePath} alt={product.productName} />
                      <span className="shop-tile-collection">{product.productCollection}</span>
                      <button
                        className="shop-tile-add"
                        disabled={outOfStock}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdd({
                            _id: product._id,
                            quantity: 1,
                            name: product.productName,
                            price: product.productPrice,
                            image: product.productImages[0],
                          });
                        }}
                      >
                        <ShoppingCartIcon />
                      </button>
                      {outOfStock && <span className="shop-tile-soldout">Sold Out</span>}
                    </Box>
                    <Box className="shop-tile-body">
                      {team && <span className="shop-tile-team">{team.teamNick}</span>}
                      <span className="shop-tile-name">{product.productName}</span>
                      <Stack className="shop-tile-footer" direction="row" justifyContent="space-between">
                        <span className="shop-tile-price">${product.productPrice.toFixed(2)}</span>
                        <span className="shop-tile-views">
                          <VisibilityIcon />
                          {product.productViews.toLocaleString()}
                        </span>
                      </Stack>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Box className="no-data">No products match these filters</Box>
          )}

          {productTotal > LIMIT && (
            <Stack className="shop-pagination" direction="row" justifyContent="center">
              <Pagination count={pageCount} page={productSearch.page} onChange={handlePageChange} />
            </Stack>
          )}
        </Box>
      </section>
    </div>
  );
}
