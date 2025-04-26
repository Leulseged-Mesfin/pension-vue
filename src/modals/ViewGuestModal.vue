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

const guest = ref({});

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  guestId: {
    type: Number,
    required: true,
  },
});

const guestId = props.guestId;

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};

const getGuest = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.GUESTS}${guestId}`
    );
    guest.value = response.data;
  } catch (error) {
    console.error("Error getting guest :", error);
  }
};

onMounted(() => {
  getGuest();
});
</script>
<template>
  <div
    class="fixed inset-0 flex items-center justify-center drop-shadow-sm backdrop-blur-xl backdrop-opacity-90 z-50"
  >
    <div class="container m-auto max-w-2xl py-24">
      <Card class="w-[600px] mx-auto">
        <CardHeader>
          <CardTitle class="text-xl">Guest Details</CardTitle>
        </CardHeader>
        <CardContent>
          <h3>
            <span class="font-semibold mb-2">Full Name: </span>
            <span class="ml-2">
              {{ guest.full_name }}
            </span>
          </h3>
          <h3>
            <span class="font-semibold mb-2">Phone Number: </span>
            <span class="ml-2">
              {{ guest.phone_number }}
            </span>
          </h3>
          <h3>
            <span class="font-semibold mb-2">Email: </span>
            <span class="ml-2">
              {{ guest.email }}
            </span>
          </h3>
          <h3>
            <span class="font-semibold mb-2">Id Document: </span>
            <span class="ml-2">
              {{ guest.id_document }}
            </span>
          </h3>
          <h3>
            <span class="font-semibold mb-2">Address: </span>
            <span class="ml-2">
              {{ guest.address }}
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
