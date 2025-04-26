<script setup>
import { ref, computed, onMounted } from "vue";
import toast, { Toaster } from "vue3-hot-toast";
import router from "@/router";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/utils/apiConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roomTypes = ref([]); // Store fetched products

const form = ref({
  number: "",
  room_type: "", // Stores selected room type name
  status: "Available",
  floor: "",
  price_per_night: "",
});

// Fetch products from API
const fetchRoomTypes = async () => {
  const token = localStorage.getItem("access");

  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.ROOM_TYPES}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    roomTypes.value = response.data; // Update room types with API data
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Handle form submission
const handleSubmit = async () => {
  const newRoom = {
    number: form.value.number,
    room_type: form.value.room_type,
    status: form.value.status,
    floor: form.value.floor,
    price_per_night: form.value.price_per_night,
  };

  const token = localStorage.getItem("access");

  try {
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.ROOMS}`,
      newRoom,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Room added successfully");
    router.push("/rooms/manage");
  } catch (error) {
    toast.error("Error adding Room");
  }
};

onMounted(async () => {
  fetchRoomTypes();
});
</script>

<template>
  <Card class="w-[450px] mx-auto mt-20">
    <CardHeader>
      <CardTitle class="text-xl">Add Room</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleSubmit">
        <div class="grid items-center w-full gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="number" class="mb-1">Room Number</Label>
            <Input
              type="number"
              id="number"
              name="number"
              v-model="form.number"
              required
            />
          </div>
          <!-- Room type Select Dropdown -->
          <div class="flex flex-col space-y-1.5">
            <Label for="status" class="mb-1">Select a room type</Label>

            <Select v-model="form.room_type">
              <SelectTrigger id="status" class="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent position="popper" class="w-full">
                <SelectItem
                  v-for="roomType in roomTypes"
                  :key="roomType.id"
                  :value="roomType.id"
                >
                  {{ roomType.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <!-- Select Status option -->
          <div class="flex flex-col space-y-1.5">
            <Label for="framework">Status</Label>
            <Select v-model="form.status">
              <SelectTrigger id="framework" class="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent position="popper" class="w-full">
                <SelectItem value="Available"> Available </SelectItem>
                <SelectItem value="Occupied"> Occupied </SelectItem>
                <SelectItem value="Maintenance"> Maintenance </SelectItem>
                <SelectItem value="Cleaning"> Cleaning </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <!-- Floor Input -->
          <div class="flex flex-col space-y-1.5">
            <Label for="floor" class="mb-1">Floor</Label>
            <Input
              type="number"
              id="floor"
              name="floor"
              v-model="form.floor"
              required
            />
          </div>

          <!-- Price per night Input -->
          <div class="flex flex-col space-y-1.5">
            <Label for="price_per_night" class="mb-1">Price per night</Label>
            <Input
              type="number"
              id="price_per_night"
              name="price_per_night"
              v-model="form.price_per_night"
              required
            />
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <Button type="submit">Add Room</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
