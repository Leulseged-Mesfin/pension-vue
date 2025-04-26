<script setup>
import toast, { Toaster } from "vue3-hot-toast";
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, reactive, onMounted, computed } from "vue";
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

const router = useRouter();

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  roomId: {
    type: Number,
    required: true,
  },
  fetchRooms: {
    type: Function,
    required: true,
  },
});

const roomId = props.roomId;

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};

const roomTypes = ref([]);

const state = reactive({
  room: {},
});

const form = reactive({
  number: "",
  room_type: "",
  status: "",
  floor: "",
  price_per_night: "",
});

// console.log(form);

// Fetch room types from API
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
    console.error("Error fetching room types:", error);
  }
};

const handleSubmit = async () => {
  const newRoom = {
    number: form.number,
    room_type: form.room_type,
    status: form.status,
    floor: form.floor,
    price_per_night: form.price_per_night,
  };

  const token = localStorage.getItem("access");

  try {
    const response = await axios.put(
      `${API_BASE_URL}${API_ENDPOINTS.ROOMS}${roomId}`,
      newRoom,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Room updated successfully");
    props.fetchRooms();
    closeModal();
  } catch (error) {
    toast.error("Error updating order");
  }
};

onMounted(async () => {
  try {
    await fetchRoomTypes();
    const token = localStorage.getItem("access");
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.ROOMS}${roomId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    state.room = response.data;
    // Populate the inputs
    form.number = state.room.number;
    form.room_type = state.room.room_type;
    form.status = state.room.status;
    form.floor = state.room.floor;
    form.price_per_night = state.room.price_per_night;
  } catch (error) {
    console.log("Error fetching room");
  }
});
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center drop-shadow-sm backdrop-blur-xl backdrop-opacity-90 z-50"
  >
    <div class="container m-auto max-w-2xl py-24">
      <Card class="w-[450px] mx-auto">
        <CardHeader>
          <CardTitle class="text-xl">Edit Room</CardTitle>
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
              <!-- <div class="flex flex-col space-y-1.5">
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
              </div> -->
              <!-- Room Type another try -->
              <div class="flex flex-col space-y-1.5">
                <Label for="room_type">Room Type</Label>
                <Select v-model="form.room_type">
                  <SelectTrigger id="room_type" class="w-full">
                    <SelectValue :placeholder="form.room_type" />
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
                <Label for="price_per_night" class="mb-1"
                  >Price per night</Label
                >
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
              <Button type="submit" class="mr-2">Update</Button>
              <Button @click="closeModal">Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
