<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import OrderBackButton from "./OrderBackButton.vue";

const route = useRoute();
const router = useRouter();

const orderId = route.params.id;

const products = ref([]);

const state = reactive({
  order: {},
});

console.log(state.order);

const form = reactive({
  product: "",
  quantity: "",
  total_price: "",
});

// Fetch products from API
const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:4000/products");
    products.value = response.data; // Update products with API data
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Compute total_price dynamically
const total_price = computed(() => {
  const selectedProduct = products.value.find(
    (product) => product.name === form.product
  );
  return selectedProduct ? selectedProduct.price * form.quantity : 0;
});

const handleSubmit = async () => {
  const newProduct = {
    product: form.product,
    quantity: form.quantity,
    total_price: total_price.value,
  };

  try {
    const response = await axios.put(
      `http://localhost:4000/orders/${orderId}`,
      newProduct
    );
    toast.success("Order updated successfully");
    router.push(`/orders/${orderId}`);
  } catch (error) {
    toast.error("Error updating order");
  }
};

onMounted(async () => {
  try {
    await fetchProducts();
    const response = await axios.get(`http://127.0.0.1:4000/orders/${orderId}`);
    state.order = response.data;
    // Populate the inputs
    form.product = state.order.product;
    form.quantity = state.order.quantity;
    form.total_price = state.order.total_price;
  } catch (error) {
    console.log("Error fetching order");
  }
});
</script>

<template>
  <OrderBackButton />
  <section class="bg-gray-0">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Edit Order</h2>

          <!-- Product Select Dropdown -->
          <div class="mb-4">
            <label for="product" class="block text-gray-700 font-bold mb-2">
              Product
            </label>
            <select
              id="product"
              name="product"
              v-model="form.product"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option disabled value="">Select a product</option>
              <option
                v-for="product in products"
                :key="product.id"
                :value="product.name"
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
              class="border rounded w-full py-2 px-3 mb-2"
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
              class="w-1/2 mx-auto flex justify-center bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Order
            </button>
            <RouterLink
              :to="`/orders/${orderId}`"
              class="w-1/2 mx-auto flex justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mt-4 rounded-lg focus:outline-none focus:shadow-outline"
              >Cancel</RouterLink
            >
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
