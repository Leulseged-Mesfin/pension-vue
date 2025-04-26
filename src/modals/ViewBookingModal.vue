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

const booking = ref({});

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  bookingId: {
    type: Number,
    required: true,
  },
});

const bookingId = props.bookingId;

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};

const getBooking = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.BOOKINGS}${bookingId}`
    );
    booking.value = response.data;
  } catch (error) {
    console.error("Error getting booking :", error);
  }
};

onMounted(() => {
  getBooking();
  //   console.log(booking.value);
});
</script>
<template>
  <div
    class="fixed inset-0 flex items-center justify-center drop-shadow-sm backdrop-blur-xl backdrop-opacity-90 z-50"
  >
    <div class="container m-auto max-w-2xl py-24">
      <Card class="w-[600px] mx-auto">
        <CardHeader>
          <CardTitle class="text-xl">Booking Details</CardTitle>
        </CardHeader>
        <CardContent>
          <h3>
            <span class="font-semibold mb-2">Guest: </span>
            {{ booking.guest }}
          </h3>
          <h3>
            <span class="font-semibold mb-2">Room: </span>
            {{ booking.room }}
          </h3>
          <h3>
            <span class="font-semibold mb-2">Check In: </span>
            {{ booking.check_in }}
          </h3>
          <h3>
            <span class="font-semibold mb-2">Check Out: </span>
            {{ booking.check_out }}
          </h3>
          <h3>
            <span class="font-semibold mb-2">Status: </span>
            {{ booking.status }}
          </h3>
        </CardContent>
        <CardFooter class="mt-4 flex justify-end">
          <Button type="submit" @click="closeModal">Close</Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
