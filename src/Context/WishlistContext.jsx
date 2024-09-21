import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();
export default function WishlistContextProvider({ children }) {
  const [count, setCount] = useState(0);
  //build all function here
  //add
  async function AddProductToWishlist(pID) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
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

  //getUserWishlist
  async function getLoggedUserWishlist() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
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

  //delete
  async function deleteProductFromWishlist(pID) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${pID}`, {
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

  async function getLogged() {
    const response = await getLoggedUserWishlist();
    setCount(response.data?.count);
  }

  useEffect(() => {
    getLogged();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        getLoggedUserWishlist,
        AddProductToWishlist,
        deleteProductFromWishlist,
        count,
        setCount,
        getLogged,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
