<script setup lang="ts">
import { ref, onMounted } from "vue";
import toast from "vue3-hot-toast";
import { useRouter } from "vue-router";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/utils/apiConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
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

const router = useRouter();

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

// selected date variable
const value1 = ref<CalendarDate | null>(null);
const value2 = ref<CalendarDate | null>(null);

const guests = ref([]);
const rooms = ref([]);

const form = ref({
  guest: "",
  room: "",
  status: "",
});

const fetchGuests = async () => {
  const token = localStorage.getItem("access");
  try {
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GUESTS}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    guests.value = response.data;
  } catch (error) {
    console.error("Error fetching guests:", error);
  }
};

const fetchRooms = async () => {
  const token = localStorage.getItem("access");
  try {
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.ROOMS}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    rooms.value = response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};

// Handle form submission
const handleSubmit = async () => {
  const checkInYear = value1.value?.year;
  const checkInMonth = value1.value?.month;
  const checkInDay = value1.value?.day;
  const checkOutYear = value2.value?.year;
  const checkOutMonth = value2.value?.month;
  const checkOutDay = value2.value?.day;

  const newBooking = {
    guest: form.value.guest,
    room: form.value.room,
    check_in: `${checkInYear}-${checkInMonth}-${checkInDay}`,
    check_out: `${checkOutYear}-${checkOutMonth}-${checkOutDay}`,
    status: form.value.status,
  };

  const token = localStorage.getItem("access");

  try {
    await axios.post(`${API_BASE_URL}${API_ENDPOINTS.BOOKINGS}`, newBooking, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Booking added successfully");
    router.push("/bookings/manage");
  } catch (error) {
    toast.error("Error adding booking");
  }
};

onMounted(async () => {
  fetchGuests();
  fetchRooms();
});
</script>

<template>
  <Card class="w-[350px] mt-20">
    <CardHeader>
      <CardTitle class="text-xl">Add Booking</CardTitle>
      <!-- <CardDescription>Add a new booking</CardDescription> -->
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
                      : "Pick a check-in date"
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
                      : "Pick a check-out date"
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
          <Button type="submit">Add Booking</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
