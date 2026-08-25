import React from "react";
import { Box, Button, IconButton, Menu, Stack } from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;

  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const itemsPrice = cartItems.reduce((a: number, c: CartItem) => a + c.quantity * c.price, 0);
  const shippingCost: number = itemsPrice < 100 ? 5 : 0;
  const totalPrice = itemsPrice + shippingCost;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);
      onDeleteAll();
      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      enqueueSnackbar(err instanceof Error ? err.message : Messages.error1, {
        variant: "error",
      });
    }
  };

  return (
    <Box className="basket-trigger">
      <IconButton
        aria-label="cart"
        aria-haspopup="true"
        onClick={handleClick}
        className="basket-icon-button"
      >
        <Badge badgeContent={cartItems.length} className="basket-badge">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{ className: "basket-menu-paper" }}
      >
        <Stack className="basket-panel">
          <Stack
            className="basket-panel-header"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <span>Your Cart</span>
            {cartItems.length !== 0 && (
              <button className="basket-clear" onClick={onDeleteAll}>
                <DeleteOutlineIcon />
                Clear
              </button>
            )}
          </Stack>

          {cartItems.length !== 0 ? (
            <>
              <Stack className="basket-items">
                {cartItems.map((item: CartItem) => {
                  const imagePath = `${serverApi}/${item.image}`;
                  return (
                    <Box className="basket-item" key={item._id}>
                      <img src={imagePath} alt={item.name} className="basket-item-image" />

                      <Box className="basket-item-info">
                        <span className="basket-item-name">{item.name}</span>
                        <span className="basket-item-price">${item.price.toFixed(2)}</span>
                      </Box>

                      <Stack className="basket-item-qty" direction="row" alignItems="center">
                        <button onClick={() => onRemove(item)}>
                          <RemoveIcon />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onAdd(item)}>
                          <AddIcon />
                        </button>
                      </Stack>

                      <button className="basket-item-remove" onClick={() => onDelete(item)}>
                        <CloseIcon />
                      </button>
                    </Box>
                  );
                })}
              </Stack>

              <Stack className="basket-summary">
                <Stack className="basket-summary-row" direction="row" justifyContent="space-between">
                  <span>Subtotal</span>
                  <span>${itemsPrice.toFixed(2)}</span>
                </Stack>
                <Stack className="basket-summary-row" direction="row" justifyContent="space-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                </Stack>
                <Stack
                  className="basket-summary-row total"
                  direction="row"
                  justifyContent="space-between"
                >
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </Stack>

                <Button className="basket-checkout" onClick={proceedOrderHandler}>
                  <ShoppingCartIcon />
                  Checkout
                </Button>
              </Stack>
            </>
          ) : (
            <Box className="basket-empty">
              <ShoppingCartIcon />
              <span>Your cart is empty</span>
              <p>Browse the shop and add some gear.</p>
            </Box>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
