import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
export default function CartContextProvidor({ children }) {
  // build functions (store data) ======> if any components need it ? useContext w ya5odha 3ady

  // state
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartID, setCartID] = useState(null);
  const returnUrl = `${window.location.origin}/#`;
  // add to cart
  async function addProductToCart(pID) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: pID,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  // get logged user cart       ==> implementation bass => when need useContext w use it
  async function getLoggedUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  // update cart
  async function updateProductCount(pID, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${pID}`,
        {
          count,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  // delete item from cart
  async function deleteItem(pID) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${pID}`, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  // clear cart
  async function clearCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  //checkout cart
  async function checkOut(cartID, formValues) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`,
        {
          shippingAddress: formValues,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
          params:{
            url: `${window.location.origin}/#`
        }
        }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  //function call useCart
  async function callinguserCart() {
    const response = await getLoggedUserCart();
    // setCartNum(response.data?.numOfCartItems);
    setCartID(response?.data?.data._id);
    setNumOfCartItems(response.data?.numOfCartItems);
  }

  useEffect(() => {
    callinguserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        getLoggedUserCart,
        addProductToCart,
        updateProductCount,
        deleteItem,
        clearCart,
        numOfCartItems,
        setNumOfCartItems,
        checkOut,
        cartID,
        callinguserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
