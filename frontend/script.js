// script.js

// ✅ Replace this with your actual backend URL if it's deployed
const backendUrl = "http://localhost:5000/api/products";

// Function to fetch products
function fetchProducts() {
  fetch(backendUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    })
    .then((products) => {
      console.log("✅ Products fetched from backend:", products);

      // Optional: loop and display in the page (not yet shown)
      // displayProducts(products); // We'll add this later
    })
    .catch((error) => {
      console.error("❌ Error fetching products:", error.message);
    });
}

// Run on page load
document.addEventListener("DOMContentLoaded", fetchProducts);
