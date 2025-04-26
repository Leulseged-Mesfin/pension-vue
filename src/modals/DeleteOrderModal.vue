<script setup>
import { useToast } from "vue-toastification";
import axios from "axios";
import { useRouter } from "vue-router";
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

const deleteOrder = async () => {
  try {
    await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.ORDERS}${orderId}`);
    toast.success("Order Deleted Successfully.");
    closeModal();
    props.fetchOrders();
  } catch (error) {
    console.error("Error deleting order:", error);
    toast.error("Error deleting Order");
  }
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center drop-shadow-sm backdrop-blur-xl backdrop-opacity-90 z-50"
  >
    <div
      class="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:max-w-xl"
    >
      <div class="md:flex">
        <div class="p-8">
          <div class="tracking-wide text-xl font-extrabold">Are you sure?</div>
          <hr class="my-4" />
          <p class="block mt-1 text-lg leading-tight font-medium text-black">
            You are about to delete this Order.
          </p>
          <div class="mt-4 flex justify-end space-x-4">
            <button
              class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              @click="deleteOrder"
            >
              Delete
            </button>
            <button
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              @click="closeModal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
