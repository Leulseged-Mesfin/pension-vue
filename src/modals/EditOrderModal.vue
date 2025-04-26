<script setup>
import { useToast } from "vue-toastification";
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, reactive, onMounted, computed } from "vue";
import { API_BASE_URL, API_ENDPOINTS } from "@/utils/apiConfig";

const router = useRouter();

const toast = useToast();

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  orderId: {
    type: Number,
    required: true,
  },
  fetchOrders: {
    type: Function,
    required: true,
  },
});

const orderId = props.orderId;

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};

const products = ref([]);

const state = reactive({
  order: {},
});

const form = reactive({
  product: "",
  quantity: "",
  total_price: "",
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
    (product) => product.name === form.product
  );
  return selectedProduct ? selectedProduct.price * form.quantity : 0;
});

const handleSubmit = async () => {
  const newProduct = {
    product_name: form.product,
    quantity: form.quantity,
    total_price: total_price.value,
  };

  console.log(newProduct);

  try {
    const response = await axios.put(
      `${API_BASE_URL}${API_ENDPOINTS.ORDERS}${orderId}`,
      newProduct
    );
    toast.success("Order updated successfully");
    closeModal();
    props.fetchOrders();
  } catch (error) {
    toast.error("Error updating order");
  }
};

onMounted(async () => {
  try {
    await fetchProducts();
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.ORDERS}${orderId}`
    );
    state.order = response.data;
    // Populate the inputs
    form.product = state.order.product_name;
    form.quantity = state.order.quantity;
    form.total_price = state.order.total_price;
  } catch (error) {
    console.log("Error fetching order");
  }
});
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center drop-shadow-sm backdrop-blur-xl backdrop-opacity-90 z-50"
  >
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
            <button
              @click="closeModal"
              class="w-1/2 mx-auto mt-1 flex justify-center bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
