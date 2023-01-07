import axios from "axios";
import React, { useEffect, useState } from "react";
import "../components/purchases/styles/purchases.css";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const URL = "https://e-commerce-api.academlo.tech/api/v1/purchases";
    axios
      .get(URL, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPurchases(res.data.data.purchases);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <>
      {purchases && Array.isArray(purchases) && purchases.length > 0 ?
        <div className="purchases__container">
          <h1 className="purchases__title">My Purchases</h1>
          <ul className="purchases__list">
            {purchases.slice().reverse().map((purchase) => (
              <div className="purchases__list--container">
                <div className="purchases__line"></div>
                <div key={purchase.id} className="purchases__item">
                  <li className="purchases__date">
                    {new Date(purchase.cart.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </li>
                </div>
                {purchase.cart.products && Array.isArray(purchase.cart.products) &&
                  <div className="purchases__list--containers">
                    {purchase.cart.products.map((product) => (
                      <ul key={product.id} className="purchases__list--item">
                        {product.title && product.productsInCart &&
                          <>
                            <li className="item__title">{product.title}</li>
                            <li className="item__quantity">{product.productsInCart.quantity}</li>
                            <li className="item__price">$ {product.price * product.productsInCart.quantity}</li>
                          </>
                        }
                      </ul>
                    ))}
                  </div>
                }
              </div>
            ))}
          </ul>
        </div>
        :
        <div className="dont__purchases">
          <h1>
            You don't have any purchases yet
          </h1>
        </div>
      }
    </>
  );
};

export default Purchase;
