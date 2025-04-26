<script setup>
import { reactive, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import ProductBackButton from "./ProductBackButton.vue";

const route = useRoute();
const router = useRouter();

const productId = route.params.id;

const state = reactive({
  product: {},
});

// console.log(state.product);

const form = reactive({
  name: "",
  category: "",
  description: "",
  stock: "",
  price: "",
});

console.log(form.category);

const handleSubmit = async () => {
  const newProduct = {
    name: form.name,
    category: form.category,
    stock: form.stock,
    description: form.description,
    price: form.price,
  };

  try {
    const response = await axios.put(
      `http://localhost:4000/products/${productId}`,
      newProduct
    );
    toast.success("Product added successfully");
    router.push(`/products/manage`);
  } catch (error) {
    toast.error("Error adding product");
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:4000/products/${productId}`
    );
    state.product = response.data;
    // Populate the inputs
    form.name = state.product.name;
    form.category = state.product.category;
    form.description = state.product.description;
    form.stock = state.product.stock;
    form.price = state.product.price;
  } catch (error) {
    console.log("Error fetching product");
  }
});
</script>

<template>
  <ProductBackButton />
  <section class="bg-gray-0">
    <div class="container m-auto max-w-2xl py-4">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Product</h2>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              v-model="form.name"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Product Name"
              required
            />
          </div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >Category</label
            >
            <select
              id="category"
              name="category"
              v-model="form.category"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Machinary">Machinary</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Stock</label>
            <input
              type="text"
              id="stock"
              name="stock"
              v-model="form.stock"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. 10"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2"
              >Description</label
            >
            <textarea
              id="description"
              name="description"
              v-model="form.description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Add Description about the Product"
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> Price </label>
            <input
              type="text"
              id="price"
              name="price"
              v-model="form.price"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Price"
              required
            />
          </div>

          <div>
            <button
              class="w-1/2 mx-auto flex justify-center bg-black hover:bg-gray-800 text-white font-bold mb-2 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
            <RouterLink
              :to="`/products/${productId}`"
              class="w-1/2 mx-auto flex justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >Cancel</RouterLink
            >
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
