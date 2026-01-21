import React from "react";
import { useParams } from "react-router-dom";
const ProductDetail = () => {
  const { barcode } = useParams();
  console.log(barcode);
  
  return <div>
    <p>This is product page</p>
    {barcode}
    </div>;
};

export default ProductDetail;
