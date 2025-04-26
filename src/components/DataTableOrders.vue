<!-- <script setup>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import DeleteOrderModal from "@/modals/DeleteOrderModal.vue";
import ViewOrderModel from "@/modals/ViewOrderModel.vue";
import EditOrderModal from "@/modals/EditOrderModal.vue";

const route = useRoute();

defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const orderId = ref(0);

const modals = reactive({
  deleteModal: false,
  viewModal: false,
  editModel: false,
});

const deleteOrder = async (id) => {
  orderId.value = id;
  modals.deleteModal = true;
};

const viewOrder = async (id) => {
  orderId.value = id;
  modals.viewModal = true;
};

const editOrder = async (id) => {
  orderId.value = id;
  modals.editModel = true;
};
</script>

<template>
  <div class="bg-white relative rounded-lg p-4">
    <h1 class="text-2xl font-semibold mb-7">Manage Orders</h1>
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr class="font-semibold text-gray-600 w-full bg-gray-100">
          <th class="px-4 py-3">ID</th>
          <th class="px-4 py-3">PRODUCT</th>
          <th class="px-4 py-3">QUANTITY</th>
          <th class="px-4 py-3">TOTAL PRICE</th>
          <th class="px-4 py-3"><span class="sr-only">Action</span></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="py-10 cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          v-for="item in items"
          :key="item.id"
        >
          <td class="px-4 py-3 font-medium text-gray-900">{{ item.id }}</td>

          <td class="px-4 py-3 font-medium text-gray-900">
            {{ item.product_name }}
          </td>

          <td class="px-4 py-3">{{ item.quantity }}</td>

          <td class="px-4 py-3">
            {{ item.total_price }}
          </td>

          <td class="px-3 py-3">
            <button
              @click="viewOrder(item.id)"
              class="text-blue-500 hover:text-blue-800"
            >
              View
            </button>
          </td>
          <td class="px-3 py-3">
            <button
              @click="editOrder(item.id)"
              class="text-blue-500 hover:text-blue-800"
            >
              Edit
            </button>
          </td>
          <td class="px-3 py-3">
            <button
              @click="deleteOrder(item.id)"
              class="text-blue-500 hover:text-blue-800"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <DeleteOrderModal
      v-if="modals.deleteModal"
      v-model="modals.deleteModal"
      :orderId="orderId"
    />
  </div>
  <div>
    <ViewOrderModel
      v-if="modals.viewModal"
      v-model="modals.viewModal"
      :orderId="orderId"
    />
  </div>
  <div>
    <EditOrderModal
      v-if="modals.editModel"
      v-model="modals.editModel"
      :orderId="orderId"
    />
  </div>
</template> -->
