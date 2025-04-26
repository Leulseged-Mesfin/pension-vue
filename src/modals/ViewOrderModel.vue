<script setup>
import { useToast } from "vue-toastification";
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { API_BASE_URL, API_ENDPOINTS } from "@/utils/apiConfig";

const router = useRouter();

const toast = useToast();

const order = ref({});

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  orderId: {
    type: Number,
    required: true,
  },
});

const orderId = props.orderId;

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};

const getOrder = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.ORDERS}${orderId}`
    );
    order.value = response.data;
  } catch (error) {
    console.error("Error getting order:", error);
  }
};

onMounted(() => {
  getOrder();
});
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center drop-shadow-sm backdrop-blur-xl backdrop-opacity-90 z-50"
  >
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0">
        <h2 class="text-3xl text-center font-semibold mb-6">Order Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 class="text-lg mb-2">
              <span class="text-lg font-semibold mb-2">Product: </span
              >{{ order.product_name }}
            </h3>
            <p class="text-lg text-black mb-2">
              <span class="text-lg font-semibold mb-2">Quantity: </span
              >{{ order.quantity }}
            </p>
            <p class="text-lg text-black mb-2">
              <span class="text-lg font-semibold mb-2">Total Price: </span
              >{{ order.total_price }}
            </p>
          </div>
        </div>
        <div class="mt-4 flex justify-end space-x-4">
          <button
            class="px-4 py-2 bg-gray-400 text-gray-900 rounded hover:bg-gray-500 hover:text-white"
            @click="closeModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
