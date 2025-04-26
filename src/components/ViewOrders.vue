<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import OrderBackButton from "./OrderBackButton.vue";

const route = useRoute();

const order = ref([]);
// console.log(order.value);

const orderId = route.params.id;

const fetchOrder = async (id) => {
  try {
    const response = await axios.get(`http://localhost:4000/orders/${id}`);
    order.value = response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
  }
};

// Fetch order on component mount
onMounted(() => {
  fetchOrder(orderId);
});
</script>

<template>
  <OrderBackButton />
  <div class="container m-auto max-w-2xl py-24">
    <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0">
      <h2 class="text-3xl text-center font-semibold mb-6">Order Details</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 class="text-lg mb-2">
            <span class="text-lg font-semibold mb-2">Product: </span
            >{{ order.product }}
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
    </div>
  </div>
</template>
