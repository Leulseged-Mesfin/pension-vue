<script setup>
import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import router from "@/router";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/utils/apiConfig";

const toast = useToast();

const products = ref([]); // Store fetched products

const form = ref({
  product: "", // Stores selected product name
  quantity: 1, // Default quantity
});

// Fetch products from API
const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`
    );
    products.value = response.data; // Update products with API data
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Compute total_price dynamically
const total_price = computed(() => {
  const selectedProduct = products.value.find(
    (product) => product.id === form.value.product
  );
  return selectedProduct ? selectedProduct.price * form.value.quantity : 0;
});

// Handle form submission
const handleSubmit = async () => {
  const newOrder = {
    product: form.value.product,
    quantity: form.value.quantity,
    total_price: total_price.value, // Use computed total price
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.ORDERS}`,
      newOrder
    );
    toast.success("Order added successfully");
    router.push("/orders/manage");
  } catch (error) {
    toast.error("Error adding Order");
  }
};

onMounted(fetchProducts);
</script>

<template>
  <section class="bg-gray-0">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md inset-shadow-sm rounded-md m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Order</h2>

          <!-- Product Select Dropdown -->
          <div class="mb-4">
            <label for="product" class="block text-gray-700 font-bold mb-2">
              Product
            </label>
            <select
              id="product"
              name="product"
              v-model="form.product"
              class="border border-gray-400 rounded w-full py-2 px-3"
              required
            >
              <option disabled value="">Select a product</option>
              <option
                v-for="product in products"
                :key="product.id"
                :value="product.id"
              >
                {{ product.name }} - ${{ product.price }}
              </option>
            </select>
          </div>

          <!-- Quantity Input -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              v-model="form.quantity"
              class="border border-gray-400 rounded w-full py-2 px-3 mb-2"
              min="1"
              required
            />
          </div>

          <!-- Total Price (Auto-calculated) -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Total Price</label
            >
            <input
              type="text"
              id="price"
              name="price"
              :value="`$${total_price.toFixed(2)}`"
              class="border border-gray-100 rounded w-full py-2 px-3 mb-2 bg-gray-200"
              readonly
            />
          </div>

          <!-- Submit Button -->
          <div>
            <button
              class="w-3/4 mx-auto flex justify-center bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Order
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
