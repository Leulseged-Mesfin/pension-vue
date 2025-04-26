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

const form = reactive({
  full_name: "",
  phone_number: "",
  email: "",
  id_document: "",
  address: "",
});

const handleSubmit = async () => {
  const newGuest = {
    full_name: form.full_name,
    phone_number: form.phone_number,
    email: form.email,
    id_document: form.id_document,
    address: form.address,
  };
  const token = localStorage.getItem("access");

  try {
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.GUESTS}`,
      newGuest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Guest added successfully");
    router.push("/guests/manage");
  } catch (error) {
    toast.error("Error adding guest");
  }
};
</script>
<template>
  <Card class="w-[350px] mt-20">
    <CardHeader>
      <CardTitle class="text-xl">Add Guest</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <Label class="mb-1" for="full_name">Full Name</Label>
          <Input
            type="text"
            id="full_name"
            name="full_name"
            v-model="form.full_name"
            placeholder="Full Name"
            required
          />
        </div>
        <div class="mb-4">
          <Label class="mb-1" for="phone_number">Phone Number</Label>
          <Input
            type="text"
            id="phone_number"
            name="phone_number"
            v-model="form.phone_number"
            placeholder="Phone Number"
            required
          />
        </div>
        <div class="mb-4">
          <Label class="mb-1" for="email">Email</Label>
          <Input
            type="text"
            id="email"
            name="email"
            v-model="form.email"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-4">
          <Label class="mb-1" for="id_document">ID Document</Label>
          <Input
            type="text"
            id="id_document"
            name="id_document"
            v-model="form.id_document"
            placeholder="ID Document"
            required
          />
        </div>
        <div class="mb-4">
          <Label class="mb-1" for="address">Address</Label>
          <Input
            type="text"
            id="address"
            name="address"
            v-model="form.address"
            placeholder="Address"
            required
          />
        </div>

        <div class="flex justify-end">
          <Button type="submit">Add Guest</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
