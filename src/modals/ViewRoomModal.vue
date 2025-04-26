<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { API_BASE_URL, API_ENDPOINTS } from "@/utils/apiConfig";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const room = ref({});

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  roomId: {
    type: Number,
    required: true,
  },
});

const roomId = props.roomId;

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};

const getRoom = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.ROOMS}${roomId}`
    );
    room.value = response.data;
  } catch (error) {
    console.error("Error getting Room:", error);
  }
};

onMounted(() => {
  getRoom();
});
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center drop-shadow-sm backdrop-blur-xl backdrop-opacity-90 z-50"
  >
    <div class="container m-auto max-w-2xl py-24">
      <Card class="w-[600px] mx-auto">
        <CardHeader>
          <CardTitle class="text-xl">Room Details</CardTitle>
        </CardHeader>
        <CardContent>
          <h3>
            <span class="font-semibold mb-2">Room Number: </span>
            {{ room.number }}
          </h3>
          <h3>
            <span class="font-semibold mb-2">Room Type: </span>
            {{ room.room_type }}
          </h3>
          <h3>
            <span class="font-semibold mb-2">Floor: </span>
            {{ room.floor }}
          </h3>
          <h3>
            <span class="font-semibold mb-2">Status: </span>
            {{ room.status }}
          </h3>
          <h3>
            <span class="font-semibold mb-2">Price per Night: </span>
            {{ room.price_per_night }}
          </h3>
        </CardContent>
        <CardFooter class="mt-4 flex justify-end">
          <Button type="submit" @click="closeModal">Close</Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
