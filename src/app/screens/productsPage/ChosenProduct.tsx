import React, { useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { setChosenProduct } from "./slice";
import { retrieveChosenProduct } from "./selector";
import { Product } from "../../../lib/types/product";
import { Team } from "../../../lib/types/team";
import { CartItem } from "../../../lib/types/search";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";

const chosenProductRetriever = createSelector(retrieveChosenProduct, (chosenProduct) => ({
  chosenProduct,
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product | null) => dispatch(setChosenProduct(data)),
});

function teamOf(value?: string | Team | null): Team | null {
  return value && typeof value === "object" ? value : null;
}

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct({ onAdd }: ChosenProductProps) {
  const { productId } = useParams<{ productId: string }>();
  const history = useHistory();
  const { setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);

  useEffect(() => {
    const product = new ProductService();
    product.getProduct(productId).then(setChosenProduct).catch((err) => console.log(err));
  }, [productId]);

  if (!chosenProduct) return null;

  const team = teamOf(chosenProduct.teamId);
  const outOfStock = chosenProduct.productLeftCount <= 0;
  const images = chosenProduct.productImages ?? [];

  return (
    <div className="shop-detail-page">
      <section className="shop-detail-hero">
        <Box className="shop-detail-inner">
          <Box className="shop-detail-gallery">
            {images.length !== 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="shop-detail-swiper"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={`${serverApi}/${img}`} alt={chosenProduct.productName} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img
                className="shop-detail-fallback"
                src="/icons/noimage-list.svg"
                alt={chosenProduct.productName}
              />
            )}
          </Box>

          <Box className="shop-detail-info">
            <span className="shop-detail-collection">{chosenProduct.productCollection}</span>
            <Box className="shop-detail-name">{chosenProduct.productName}</Box>

            <Stack className="shop-detail-meta" direction="row" alignItems="center">
              <span className="shop-detail-views">
                <VisibilityIcon />
                {chosenProduct.productViews.toLocaleString()} views
              </span>
              <span className={outOfStock ? "shop-detail-stock out" : "shop-detail-stock"}>
                {outOfStock ? "Sold Out" : `${chosenProduct.productLeftCount} in stock`}
              </span>
            </Stack>

            {team && (
              <Box className="shop-detail-team" onClick={() => history.push(`/teams/${team._id}`)}>
                <img
                  src={
                    team.teamImage?.[0] ? `${serverApi}/${team.teamImage[0]}` : "/icons/default-user.svg"
                  }
                  alt={team.teamNick}
                />
                <Box className="shop-detail-team-info">
                  <span className="shop-detail-team-label">Team</span>
                  <span className="shop-detail-team-name">{team.teamNick}</span>
                </Box>
                <ArrowForwardIcon />
              </Box>
            )}

            <p className="shop-detail-desc">
              {chosenProduct.productDesc || "No description available for this product."}
            </p>

            <Stack
              className="shop-detail-footer"
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <span className="shop-detail-price">${chosenProduct.productPrice.toFixed(2)}</span>
              <Button
                className="shop-detail-add"
                disabled={outOfStock}
                onClick={() =>
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  })
                }
              >
                <ShoppingCartIcon />
                {outOfStock ? "Sold Out" : "Add to Cart"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </section>
    </div>
  );
}
