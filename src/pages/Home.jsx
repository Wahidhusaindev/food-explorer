import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  searchProductsByName,
  getProductsByCategory,
} from "../services/openFoodApi";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch products
  const fetchProducts = async (reset = false) => {
    try {
      setLoading(true);
      setError("");

      let data = [];

      if (category) {
        data = await getProductsByCategory(category, page);
      } else {
        data = await searchProductsByName(searchTerm, page);
      }

      setProducts((prev) =>
        reset ? data : [...prev, ...data]
      );
    } catch (err) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial + pagination fetch
  useEffect(() => {
    fetchProducts(page === 1);
    // eslint-disable-next-line
  }, [page, category]);

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(1);
    setProducts([]);

    // Barcode search (numeric & length >= 8)
    if (/^\d{8,}$/.test(value)) {
      navigate(`/product/${value}`);
      return;
    }

    fetchProducts(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Food Product Explorer</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by product name or barcode"
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 w-full mb-4"
      />

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setPage(1);
          setProducts([]);
        }}
        className="border p-2 mb-4"
      >
        <option value="">All Categories</option>
        <option value="beverages">Beverages</option>
        <option value="dairy">Dairy</option>
        <option value="snacks">Snacks</option>
      </select>

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="border p-3 cursor-pointer"
            onClick={() =>
              navigate(`/product/${product.code}`)
            }
          >
            <img
              src={product.image_url || "https://via.placeholder.com/150"}
              alt={product.product_name}
              className="h-40 w-full object-cover mb-2"
            />
            <h2 className="font-semibold text-sm">
              {product.product_name || "Unnamed Product"}
            </h2>
            <p className="text-xs">
              Nutrition Grade:{" "}
              {product.nutrition_grades
                ? product.nutrition_grades.toUpperCase()
                : "N/A"}
            </p>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-4 text-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="border px-4 py-2"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
