<script setup>
import toast, { Toaster } from "vue3-hot-toast";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/utils/apiConfig";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  bookingId: {
    type: Number,
    required: true,
  },
  fetchBookings: {
    type: Function,
    required: true,
  },
});

const bookingId = props.bookingId;

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};

const deleteBooking = async () => {
  const token = localStorage.getItem("access");
  try {
    await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.BOOKINGS}${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Booking Deleted Successfully.");
    closeModal();
    props.fetchBookings();
  } catch (error) {
    toast.error("Error deleting Booking");
  }
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center drop-shadow-sm backdrop-blur-xl backdrop-opacity-90 z-50"
  >
    <div class="container m-auto max-w-2xl py-24">
      <Card class="w-[600px] mx-auto">
        <CardHeader>
          <CardTitle class="text-xl">Are you sure?</CardTitle>
          <CardDescription>
            <hr class="my-4" />
            You are about to delete this Order.
          </CardDescription>
        </CardHeader>
        <CardFooter class="mt-4 flex justify-end">
          <Button
            type="submit"
            @click="deleteBooking"
            class="bg-red-600 text-white hover:bg-red-700 mr-2"
            >Delete</Button
          >
          <Button type="submit" @click="closeModal">Cancel</Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
