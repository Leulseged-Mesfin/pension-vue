<!-- <script setup>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import DeleteProductModal from "@/modals/DeleteProductModal.vue";
import ViewProductModel from "@/modals/ViewProductModel.vue";
import EditProductModal from "@/modals/EditProductModal.vue";

const route = useRoute();

defineProps({
  items: {
    type: Array,
    required: true,
  },
  fetchProducts: {
    type: Function,
    required: true,
  },
});

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
</script>

<template>
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
    />
  </div>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
// import BackButton from "@/components/BackButton.vue";
import ViewProductModel from "@/modals/ViewProductModel.vue";
import EditProductModal from "@/modals/EditProductModal.vue";

const route = useRoute();

defineProps({
  items: {
    type: Array,
    required: true,
  },
});

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
</script>

<template>
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]"> ID </TableHead>
        <TableHead>NAME</TableHead>
        <TableHead>CATEGORY</TableHead>
        <TableHead>DESCRIPTION</TableHead>
        <TableHead>STOCK</TableHead>
        <TableHead>PRICE</TableHead>
        <TableHead class="text-right">
          <span class="sr-only">Action</span></TableHead
        >
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        class="py-10 cursor-pointer border-b border-gray-200 hover:bg-gray-100"
        v-for="item in items"
        :key="item.id"
      >
        <TableCell class="font-medium"> {{ item.id }}</TableCell>
        <TableCell class="font-medium"> {{ item.name }}</TableCell>
        <TableCell class="font-medium"> {{ item.category }}</TableCell>
        <TableCell class="font-medium"> {{ item.description }}</TableCell>
        <TableCell class="font-medium"> {{ item.stock }}</TableCell>
        <TableCell class="font-medium"> {{ item.price }}</TableCell>
        <TableCell class="font-medium">
          <button
            @click="viewProduct(item.id)"
            :productId="item.id"
            class="text-blue-500 hover:text-blue-800"
          >
            View
          </button>
        </TableCell>
        <TableCell class="font-medium">
          <button
            @click="editProduct(item.id)"
            :productId="item.id"
            class="text-blue-500 hover:text-blue-800"
          >
            Edit
          </button>
        </TableCell>
        <TableCell class="font-medium">
          <button
            @click="deleteProduct(item.id)"
            :productId="item.id"
            class="text-blue-500 hover:text-blue-800"
          >
            Delete
          </button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

 -->
