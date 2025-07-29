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

// Fetch and display cart items (orders)
function fetchCart() {
  fetch("http://localhost:5000/api/orders")
    .then((response) => response.json())
    .then((data) => {
      // If you get a list of orders, pick the latest or the one for the current user
      const order = Array.isArray(data) ? data[data.length - 1] : data.order || data;
      if (!order || !Array.isArray(order.items)) {
        console.error("No items found in order");
        return;
      }
      // Example: display items in console
      order.items.forEach(item => {
        console.log(`Product: ${item.name}, Qty: ${item.qty}, Price: ${item.price}`);
        // You can add DOM manipulation here to show items in the cart page
      });
    })
    .catch((err) => console.error("Error fetching cart items:", err));
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();

  // Run fetchCart on cart page load
  if (window.location.pathname.includes("cart.html")) {
    fetchCart();
  }
});
