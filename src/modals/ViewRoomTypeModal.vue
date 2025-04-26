<script setup>
import { useToast } from "vue-toastification";
import axios from "axios";
import { useRouter } from "vue-router";
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

const router = useRouter();

const toast = useToast();

const roomType = ref({});

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  roomTypeId: {
    type: Number,
    required: true,
  },
});

const roomTypeId = props.roomTypeId;

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};

const getRoomType = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.ROOM_TYPES}${roomTypeId}`
    );
    roomType.value = response.data;
  } catch (error) {
    console.error("Error getting Room Type:", error);
  }
};

onMounted(() => {
  getRoomType();
});
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center drop-shadow-sm backdrop-blur-xl backdrop-opacity-90 z-50"
  >
    <div class="container m-auto max-w-2xl py-24">
      <Card class="w-[600px] mx-auto">
        <CardHeader>
          <CardTitle class="text-xl">Room Type Details</CardTitle>
        </CardHeader>
        <CardContent>
          <h3>
            <span class="font-semibold mb-2">Name: </span>
            <span class="ml-2">
              {{ roomType.name }}
            </span>
          </h3>
          <h3>
            <span class="font-semibold mb-2">Description: </span>
            <span class="ml-2">
              {{ roomType.description }}
            </span>
          </h3>
          <h3>
            <span class="font-semibold mb-2">Base Price: </span>
            <span class="ml-2">
              {{ roomType.base_price }}
            </span>
          </h3>
        </CardContent>
        <CardFooter class="mt-4 flex justify-end">
          <Button type="submit" @click="closeModal">Close</Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
