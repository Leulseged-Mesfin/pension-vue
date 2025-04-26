<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import DeleteProductModal from "@/modals/DeleteProductModal.vue";
import ViewProductModel from "@/modals/ViewProductModel.vue";
import EditProductModal from "@/modals/EditProductModal.vue";
import axios from "axios";
import {
  API_BASE_URL,
  API_BASE_URL_LOGIN,
  API_ENDPOINTS,
} from "@/utils/apiConfig";

const route = useRoute();

const items = ref([]);

const productId = ref(0);

const modals = reactive({
  deleteModal: false,
  viewModal: false,
  editModal: false,
});

const deleteProduct = async (id) => {
  productId.value = id;
  modals.deleteModal = true;
};

const viewProduct = async (id) => {
  productId.value = id;
  modals.viewModal = true;
};

const editProduct = async (id) => {
  productId.value = id;
  modals.editModal = true;
};

const fetchProducts = async () => {
  const token = localStorage.getItem("access");

  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    items.value = response.data;
    // console.log(items.value);
  } catch (error) {
    console.error("Error fetching job:", error);
  }
};

onMounted(async () => {
  fetchProducts();
});
</script>

<template>
  <div class="p-4 bg-gray-30 mt-20 overflow-y-auto h-[80vh]">
    <div class="bg-white relative rounded-lg p-4 shadow-md inset-shadow-sm">
      <h1 class="text-2xl font-semibold mb-7">Manage Products</h1>
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">NAME</th>
            <th class="px-4 py-3">CATEGORY</th>
            <th class="px-4 py-3">DESCRIPTION</th>
            <th class="px-4 py-3">STOCK</th>
            <th class="px-4 py-3">PRICE</th>
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
            <td class="px-4 py-3 font-medium text-gray-900">{{ item.name }}</td>
            <td class="px-4 py-3">{{ item.category }}</td>
            <td class="px-4 py-3">
              {{ item.description }}
            </td>
            <td class="px-4 py-3">{{ item.stock }}</td>
            <td class="px-4 py-3">
              {{ item.price }}
            </td>
            <td class="px-3 py-3">
              <button
                @click="viewProduct(item.id)"
                :productId="item.id"
                class="text-blue-500 hover:text-blue-800"
              >
                View
              </button>
            </td>
            <td class="px-3 py-3">
              <button
                @click="editProduct(item.id)"
                :productId="item.id"
                class="text-blue-500 hover:text-blue-800"
              >
                Edit
              </button>
            </td>
            <td class="px-3 py-3">
              <!-- {{ typeof item.id }} -->
              <button
                @click="deleteProduct(item.id)"
                :productId="item.id"
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
      <DeleteProductModal
        v-if="modals.deleteModal"
        v-model="modals.deleteModal"
        :productId="productId"
        :fetchProducts="fetchProducts"
      />
    </div>
    <div>
      <ViewProductModel
        v-if="modals.viewModal"
        v-model="modals.viewModal"
        :productId="productId"
      />
    </div>
    <div>
      <EditProductModal
        v-if="modals.editModal"
        v-model="modals.editModal"
        :productId="productId"
        :fetchProducts="fetchProducts"
      />
    </div>
  </div>
</template>
