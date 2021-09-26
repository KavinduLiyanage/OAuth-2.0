import React from "react";
import PrimarySearchAppBar from "../components/appBar";
// import ProductsList from "./Products/productsList";

export default function HomePage() {
  return (
    <div className="container">
      <PrimarySearchAppBar />
      <h1 align="center">
        {" "}
        <span className="badge badge-dark">
          HomePage
        </span>
      </h1>
      {/* <ProductsList /> */}
    </div>
  );
}
