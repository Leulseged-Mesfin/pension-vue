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
  roomTypeId: {
    type: Number,
    required: true,
  },
  fetchRoomType: {
    type: Function,
    required: true,
  },
});

const roomTypeId = props.roomTypeId;

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};

const state = reactive({
  roomType: {},
});

const form = reactive({
  name: "",
  description: "",
  base_price: "",
});

const handleSubmit = async () => {
  const newRoomType = {
    name: form.name,
    description: form.description,
    base_price: Number(form.base_price),
  };

  try {
    const response = await axios.put(
      `${API_BASE_URL}${API_ENDPOINTS.ROOM_TYPES}${roomTypeId}`,
      newRoomType
    );
    toast.success("Room Type Updated successfully");
    closeModal();
    props.fetchRoomType();
  } catch (error) {
    toast.error("Error updating room type");
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.ROOM_TYPES}${roomTypeId}`
    );
    state.roomType = response.data;
    // Populate the inputs
    form.name = state.roomType.name;
    form.description = state.roomType.description;
    form.base_price = state.roomType.base_price;
  } catch (error) {
    console.log("Error fetching room type");
  }
});
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center drop-shadow-sm backdrop-blur-xl backdrop-opacity-90 z-50"
  >
    <Card class="w-[600px] mt-10">
      <CardHeader>
        <CardTitle class="text-xl">Edit Room Type</CardTitle>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <Label class="mb-1" for="name">Room Type Name</Label>
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
            <Label class="mb-1" for="description">Description</Label>
            <Input
              type="text"
              id="description"
              name="description"
              v-model="form.description"
              placeholder="Description"
              required
            />
          </div>
          <div class="mb-4">
            <Label class="mb-1" for="base_price">Base Price</Label>
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
            <Button type="submit" class="mr-2">Update</Button>
            <Button @click="closeModal">Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
