import axios from "axios";
import React, { useEffect, useState } from "react";
import "../components/home/styles/purchases.css";

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
        console.log(res.data.data.purchases);
      })
      .catch((err) => console.log(err));
  }, [purchases]);

  return (
    <div className="purchases__container">
      <h1 className="purchases__title">Purchases</h1>
      <ul className="purchases__list">
        {purchases?.map((purchase) => (
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
              <li>
                {/* <div className="purchases__line"></div> */}
              </li>
            </div>
            <div className="purchases__list--containers">
              {purchase.cart.products.map((product) => (
                <ul key={product.id} className="purchases__list--item">
                 
                    <li className="item__title">{product.title}</li>
                    <li className="item__quantity">{product.productsInCart.quantity}</li>
                    <li className="item__price">{product.price}</li>
                 
                </ul>
              ))}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Purchase;
