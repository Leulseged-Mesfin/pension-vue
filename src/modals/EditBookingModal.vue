<script setup>
import toast, { Toaster } from "vue3-hot-toast";
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, reactive, onMounted, computed } from "vue";
import { API_BASE_URL, API_ENDPOINTS } from "@/utils/apiConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";

const router = useRouter();

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

const guests = ref([]);
const rooms = ref([]);

const state = reactive({
  booking: {},
});

const form = reactive({
  guest: "",
  room: "",
  check_in: "2025-04-25",
  check_out: "2025-04-26",
  status: "",
});

// Fetch guests from API
const fetchGuests = async () => {
  const token = localStorage.getItem("access");
  try {
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GUESTS}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    guests.value = response.data; // Update guests with API data
  } catch (error) {
    console.error("Error fetching guests:", error);
  }
};

// Fetch rooms from API
const fetchRooms = async () => {
  const token = localStorage.getItem("access");
  try {
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.ROOMS}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    rooms.value = response.data; // Update rooms with API data
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};

const handleSubmit = async () => {
  const newBooking = {
    guest: form.guest,
    room: form.room,
    check_in: form.check_in,
    check_out: form.check_out,
    status: form.status,
  };

  const token = localStorage.getItem("access");

  try {
    const response = await axios.put(
      `${API_BASE_URL}${API_ENDPOINTS.BOOKINGS}${bookingId}`,
      newBooking,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Booking updated successfully");
    closeModal();
    props.fetchBookings();
  } catch (error) {
    toast.error("Error updating booking");
  }
};

onMounted(async () => {
  try {
    await fetchGuests();
    await fetchRooms();
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.BOOKINGS}${bookingId}`
    );
    state.booking = response.data;
    // Populate the inputs
    form.guest = state.booking.guest;
    form.room = state.booking.room;
    form.check_in = state.booking.check_in;
    form.check_out = state.booking.check_out;
    form.status = state.booking.status;
  } catch (error) {
    console.log("Error fetching booking");
  }
});
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center drop-shadow-sm backdrop-blur-xl backdrop-opacity-90 z-50"
  >
    <Card class="w-[600px] mt-15">
      <CardHeader>
        <CardTitle class="text-xl">Edit Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit">
          <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="guest">Guest</Label>
              <Select v-model="form.guest">
                <SelectTrigger id="guest" class="w-full">
                  <SelectValue placeholder="Select Guest" />
                </SelectTrigger>
                <SelectContent position="popper" class="w-full">
                  <SelectItem
                    v-for="guest in guests"
                    :key="guest.id"
                    :value="guest.id"
                    ><span>{{ guest.full_name }}</span></SelectItem
                  >
                </SelectContent>
              </Select>
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="room">Room</Label>
              <Select v-model="form.room">
                <SelectTrigger id="room" class="w-full">
                  <SelectValue placeholder="Select Room" />
                </SelectTrigger>
                <SelectContent position="popper" class="w-full">
                  <SelectItem
                    v-for="room in rooms"
                    :key="room.id"
                    :value="room.id"
                    ><span>{{ room.number }}</span></SelectItem
                  >
                </SelectContent>
              </Select>
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="name">Check In</Label>
              <Popover v-model="form.check_in">
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    :class="
                      cn(
                        'w-full justify-start text-left font-normal',
                        !value && 'text-muted-foreground'
                      )
                    "
                  >
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {{
                      value
                        ? df.format(value.toDate(getLocalTimeZone()))
                        : "Pick a check-in date"
                    }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar v-model="value" initial-focus />
                </PopoverContent>
              </Popover>
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="name">Check Out</Label>
              <Popover v-model="form.check_in">
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    :class="
                      cn(
                        'w-full justify-start text-left font-normal',
                        !value && 'text-muted-foreground'
                      )
                    "
                  >
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {{
                      value
                        ? df.format(value.toDate(getLocalTimeZone()))
                        : "Pick a check-in date"
                    }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar v-model="value" initial-focus />
                </PopoverContent>
              </Popover>
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="framework">Status</Label>
              <Select v-model="form.status">
                <SelectTrigger id="framework" class="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent position="popper" class="w-full">
                  <SelectItem value="Booked"> Booked </SelectItem>
                  <SelectItem value="Checked In"> Checked In </SelectItem>
                  <SelectItem value="Checked Out"> Checked Out </SelectItem>
                  <SelectItem value="Cancelled"> Cancelled </SelectItem>
                </SelectContent>
              </Select>
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
</template>
