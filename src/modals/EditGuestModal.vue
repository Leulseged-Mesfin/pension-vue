<script setup>
import toast, { Toaster } from "vue3-hot-toast";
import axios from "axios";
import { useRouter } from "vue-router";
import { reactive, onMounted } from "vue";
import { API_BASE_URL, API_ENDPOINTS } from "@/utils/apiConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const router = useRouter();

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  guestId: {
    type: Number,
    required: true,
  },
  fetchGuests: {
    type: Function,
    required: true,
  },
});

const guestId = props.guestId;

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};

const state = reactive({
  guest: {},
});

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
    const response = await axios.put(
      `${API_BASE_URL}${API_ENDPOINTS.GUESTS}${guestId}`,
      newGuest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Guest Updated successfully");
    props.fetchGuests();
    closeModal();
  } catch (error) {
    toast.error("Error updating guest");
    console.log(error);
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.GUESTS}${guestId}`
    );
    state.guest = response.data;
    // console.log("Guest");
    // console.log(state.guest);
    // Populate the inputs
    form.full_name = state.guest.full_name;
    form.phone_number = state.guest.phone_number;
    form.email = state.guest.email;
    form.id_document = state.guest.id_document;
    form.address = state.guest.address;
  } catch (error) {
    console.log("Error fetching guest");
  }
});
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center drop-shadow-sm backdrop-blur-xl backdrop-opacity-90 z-50"
  >
    <Card class="w-[600px] mt-15">
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
            <Button type="submit" class="mr-2">Update</Button>
            <Button @click="closeModal">Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
