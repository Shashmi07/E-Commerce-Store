const backendUrl = "http://localhost:5000";

// === Fetch and display products ===
function fetchProducts() {
  fetch(`${backendUrl}/api/products`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    })
    .then((products) => {
      console.log("✅ Products fetched from backend:", products);
      // Optionally render products to page
      // displayProducts(products);
    })
    .catch((error) => {
      console.error("❌ Error fetching products:", error.message);
    });
}

// === Fetch the most recent order (cart items) ===
function fetchCart() {
  fetch(`${backendUrl}/api/orders`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      return response.json();
    })
    .then((orders) => {
      if (!Array.isArray(orders) || orders.length === 0) {
        console.warn("No orders found");
        return;
      }

      const latestOrder = orders[0]; // Get the most recent order
      if (!latestOrder.products || !Array.isArray(latestOrder.products)) {
        console.warn("No products found in the latest order");
        return;
      }

      console.log("🛒 Latest order items:");
      latestOrder.products.forEach((item) => {
        console.log(`Product: ${item.name}, Qty: ${item.quantity}, Price: ${item.price}`);
        // TODO: You can add DOM logic to show in cart table
      });
    })
    .catch((error) => {
      console.error("❌ Error fetching cart items:", error.message);
    });
}

// === Run on page load ===
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();

  if (window.location.pathname.includes("cart.html")) {
    fetchCart();
  }
});
