<script setup lang="ts">
import toast from "vue3-hot-toast";
import axios from "axios";
import { ref, reactive, onMounted } from "vue";
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

// shadcn components
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

// icons
import { CalendarIcon } from "lucide-vue-next";

// date handling
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
import type { CalendarDate } from "@internationalized/date"; // correct type

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

// selected date variable
const value1 = ref<CalendarDate | null>(null);
const value2 = ref<CalendarDate | null>(null);

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
  check_in: "",
  check_out: "",
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
  const checkInYear = value1.value?.year;
  const checkInMonth = value1.value?.month;
  const checkInDay = value1.value?.day;
  const checkOutYear = value2.value?.year;
  const checkOutMonth = value2.value?.month;
  const checkOutDay = value2.value?.day;

  const PreviousCheckInDate = state.booking.check_in;
  const PreviousCheckOutDate = state.booking.check_out;
  const NewCheckInDate = `${checkInYear}-${checkInMonth}-${checkInDay}`;
  const NewCheckOutDate = `${checkOutYear}-${checkOutMonth}-${checkOutDay}`;

  const guestId =
    guests.value.find((guest) => guest.full_name === form.guest)?.id || null;
  const roomId =
    rooms.value.find((room) => room.number === form.room)?.id || null;

  // Check if guestId and roomId are valid before proceeding
  if (!guestId || !roomId) {
    toast.error("Please select both guest and room.");
    return; // Stop the submission if there's an issue
  }

  const newBooking = {
    guest: Number(guestId),
    room: Number(roomId),
    check_in:
      NewCheckInDate === "undefined-undefined-undefined"
        ? PreviousCheckInDate
        : NewCheckInDate,
    check_out:
      NewCheckOutDate === "undefined-undefined-undefined"
        ? PreviousCheckOutDate
        : NewCheckOutDate,
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
                  <SelectValue :placeholder="form.guest" />
                </SelectTrigger>
                <SelectContent position="popper" class="w-full">
                  <SelectItem
                    v-for="guest in guests"
                    :key="guest.id"
                    :value="guest.full_name"
                  >
                    {{ guest.full_name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="room_type">Room</Label>
              <Select v-model="form.room">
                <SelectTrigger id="room" class="w-full">
                  <SelectValue :placeholder="form.room" />
                </SelectTrigger>
                <SelectContent position="popper" class="w-full">
                  <SelectItem
                    v-for="room in rooms"
                    :key="room.id"
                    :value="room.number"
                  >
                    {{ room.number }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="name">Check In</Label>
              <Popover>
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    :class="
                      cn(
                        'w-full justify-start text-left font-normal',
                        !value1 && 'text-muted-foreground'
                      )
                    "
                  >
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {{
                      value1
                        ? df.format(value1.toDate(getLocalTimeZone()))
                        : form.check_in
                    }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar v-model="value1" initial-focus />
                </PopoverContent>
              </Popover>
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="name">Check Out</Label>
              <Popover>
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    :class="
                      cn(
                        'w-full justify-start text-left font-normal',
                        !value2 && 'text-muted-foreground'
                      )
                    "
                  >
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {{
                      value2
                        ? df.format(value2.toDate(getLocalTimeZone()))
                        : form.check_out
                    }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar v-model="value2" initial-focus />
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
