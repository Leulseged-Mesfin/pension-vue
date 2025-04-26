<script setup>
import { reactive } from "vue";
import toast, { Toaster } from "vue3-hot-toast";
import router from "@/router";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/utils/apiConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const form = reactive({
  name: "",
  description: "",
  base_price: "",
});

const handleSubmit = async () => {
  const newProduct = {
    name: form.name,
    description: form.description,
    base_price: Number(form.base_price),
  };
  const token = localStorage.getItem("access");

  console.log(newProduct);

  try {
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.ROOM_TYPES}`,
      newProduct,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Room Type added successfully");
    router.push(`/room-types/manage`);
  } catch (error) {
    toast.error("Error adding room type");
  }
};
</script>
<template>
  <Card class="w-[350px] mt-20">
    <CardHeader>
      <CardTitle class="text-xl">Add Room Type</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <Label class="block text-gray-700 font-bold mb-2">
            Room Type Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            v-model="form.name"
            placeholder="Room Type Name"
            required
          />
        </div>

        <div class="mb-4">
          <Label for="description" class="block text-gray-700 font-bold mb-2"
            >Description</Label
          >
          <Textarea
            id="description"
            name="description"
            v-model="form.description"
            placeholder="Add Description about the Product"
          />
        </div>

        <div class="mb-4">
          <Label class="block text-gray-700 font-bold mb-2"> Base Price </Label>
          <Input
            type="text"
            id="base_price"
            name="base_price"
            v-model="form.base_price"
            placeholder="Base Price"
            required
          />
        </div>

        <div class="flex justify-end">
          <Button type="submit"> Add Room Type </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
