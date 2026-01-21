export const sortProducts = (products, option) => {
  const sorted = [...products];

  if (option === "name-asc") {
    sorted.sort((a, b) =>
      (a.product_name || "").localeCompare(b.product_name || "")
    );
  }

  if (option === "name-desc") {
    sorted.sort((a, b) =>
      (b.product_name || "").localeCompare(a.product_name || "")
    );
  }

  if (option === "nutrition") {
    sorted.sort(
      (a, b) =>
        (a.nutrition_grades || "z").charCodeAt(0) -
        (b.nutrition_grades || "z").charCodeAt(0)
    );
  }

  return sorted;
};
