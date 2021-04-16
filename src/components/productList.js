import React, { useState } from "react";
import Async from 'react-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styling/productList.css";



// request product data from this API
const loadProducts = () =>
  fetch("https://run.mocky.io/v3/fca7ef93-8d86-4574-9a4a-3900d91a283e")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

   
function ProductList() {

const handleToggle = (e) => {
    let element = e.target;
    if(!element.classList.contains('active')){
        element.classList.add('active');
    }else{
        element.classList.remove('active');
    }
  };
    return (
    <div className="containerMain">
      <Async promiseFn={loadProducts}>
        {({ data, err, isLoading }) => {
          if (isLoading) return "Loading..."
          if (err) return `Something went wrong: ${err.message}`

          if (data)
            return (
                <div className="container">
                    {data.map(product=> (
                        <div key={product.name} className="row" onClick={handleToggle}>
                            <div className="col-sm-8">
                                <div className="card">
                                    <img className="card-img" src={product.imageUrl} ></img>
                                    <div className="card-body">
                                        <h4 className="card-title">{product.name}</h4>
                                        <p className="card-text"> {product.description} </p>
                                        <div className="options d-flex flex-fill">
                                            <p className="card-text"> Quantity available:  <b>{product.quantity}</b> </p>
                                            <p className="card-text promotion"> {product.promotionBadge} </p>
                                        </div>
                                        <div className="buy d-flex justify-content-between align-items-center">
                                            <div className="price text-success">
                                                <h5 className="mt-4"> Price : £{product.price}  </h5>
                                            </div>
                                            <div className="price promotion priceWas">
                                                <h5 className="mt-4">Was: £{product.priceWas}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }}
      </Async>
    </div>
    )
  }

  export default ProductList;