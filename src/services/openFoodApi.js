import axios from "axios";

const BASE_URL = "https://world.openfoodfacts.org";

// 1️⃣ Search products by name
export const searchProductsByName = async (name, page = 1, pageSize = 20) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/cgi/search.pl`,
      {
        params: {
          search_terms: name,
          page,
          page_size: pageSize,
          json: true,
        },
      }
    );

    return response.data.products || [];
  } catch (error) {
    console.error("Search by name failed:", error);
    throw error;
  }
};

// 2️⃣ Get products by category
export const getProductsByCategory = async (category, page = 1, pageSize = 20) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/category/${category}.json`,
      {
        params: {
          page,
          page_size: pageSize,
        },
      }
    );

    return response.data.products || [];
  } catch (error) {
    console.error("Category fetch failed:", error);
    throw error;
  }
};

// 3️⃣ Get product details by barcode
export const getProductByBarcode = async (barcode) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v0/product/${barcode}.json`
    );

    if (response.data.status !== 1) {
      throw new Error("Product not found");
    }

    return response.data.product;
  } catch (error) {
    console.error("Barcode fetch failed:", error);
    throw error;
  }
};
