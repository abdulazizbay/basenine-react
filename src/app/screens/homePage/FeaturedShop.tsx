import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { retrieveFeaturedProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { Team } from "../../../lib/types/team";
import { serverApi } from "../../../lib/config";

const featuredProductsRetriever = createSelector(
  retrieveFeaturedProducts,
  (featuredProducts) => ({ featuredProducts }),
);

function teamOf(value?: string | Team | null): Team | null {
  return value && typeof value === "object" ? value : null;
}

export default function FeaturedShop() {
  const { featuredProducts } = useSelector(featuredProductsRetriever);
  const history = useHistory();

  return (
    <section className="featured-shop-section">
      <Container>
        <Stack
          className="section-header"
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Box>
            <Box className="section-eyebrow">TEAM STORE</Box>
            <Box className="section-title">Featured Shop</Box>
          </Box>
          <button className="section-view-all" onClick={() => history.push("/products")}>
            View All
            <ArrowForwardIcon />
          </button>
        </Stack>

        {featuredProducts.length !== 0 ? (
          <Box className="shop-grid">
            {featuredProducts.map((product: Product) => {
              const imagePath = product.productImages?.[0]
                ? `${serverApi}/${product.productImages[0]}`
                : "/icons/noimage-list.svg";
              const team = teamOf(product.teamId);
              return (
                <Box
                  key={product._id}
                  className="shop-card"
                  onClick={() => history.push(`/products/${product._id}`)}
                >
                  <Box className="shop-card-media">
                    <img src={imagePath} alt={product.productName} />
                    <span className="shop-card-collection">{product.productCollection}</span>
                    <Box className="shop-card-overlay">
                      <ShoppingCartIcon />
                    </Box>
                  </Box>
                  <Box className="shop-card-body">
                    {team && <span className="shop-card-team">{team.teamNick}</span>}
                    <span className="shop-card-name">{product.productName}</span>
                    <span className="shop-card-price">${product.productPrice.toFixed(2)}</span>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box className="no-data">No products yet</Box>
        )}
      </Container>
    </section>
  );
}
