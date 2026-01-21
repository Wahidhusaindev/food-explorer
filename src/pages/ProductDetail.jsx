import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductByBarcode } from "../services/openFoodApi";

const ProductDetail = () => {
  const { barcode } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductByBarcode(barcode);
        setProduct(data);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [barcode]);

  if (loading) return <p className="p-4">Loading product...</p>;
  if (error)
    return (
      <div className="p-4">
        <p className="text-red-500">{error}</p>
        <button onClick={() => navigate("/")} className="underline">
          Go Back
        </button>
      </div>
    );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button onClick={() => navigate("/")} className="underline mb-4">
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-2">
        {product.product_name || "Unnamed Product"}
      </h1>

      <img
        src={product.image_url || "https://via.placeholder.com/300"}
        alt={product.product_name}
        className="w-64 mb-4"
      />

      <p><strong>Nutrition Grade:</strong> {product.nutrition_grades?.toUpperCase() || "N/A"}</p>

      <h2 className="font-semibold mt-4">Ingredients</h2>
      <p>{product.ingredients_text || "No ingredients data available."}</p>

      <h2 className="font-semibold mt-4">Nutritional Values (per 100g)</h2>
      <ul className="list-disc ml-6">
        <li>Energy: {product.nutriments?.energy || "N/A"}</li>
        <li>Fat: {product.nutriments?.fat || "N/A"}</li>
        <li>Carbs: {product.nutriments?.carbohydrates || "N/A"}</li>
        <li>Proteins: {product.nutriments?.proteins || "N/A"}</li>
      </ul>

      <h2 className="font-semibold mt-4">Labels</h2>
      <p>{product.labels || "No labels available."}</p>
    </div>
  );
};

export default ProductDetail;
