<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ref, reactive, onMounted } from "vue";
import DeleteBookingModal from "@/modals/DeleteBookingModal.vue";
import ViewBookingModal from "@/modals/ViewBookingModal.vue";
import EditBookingModal from "@/modals/EditBookingModal.vue";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/utils/apiConfig";

const items = ref([]);

const bookingId = ref(0);

const modals = reactive({
  deleteModal: false,
  viewModal: false,
  editModel: false,
});

const deleteBooking = async (id) => {
  bookingId.value = id;
  modals.deleteModal = true;
};

const viewBooking = async (id) => {
  console.log(id);
  bookingId.value = id;
  modals.viewModal = true;
};

const editBooking = async (id) => {
  bookingId.value = id;
  modals.editModel = true;
};

const fetchBookings = async () => {
  const token = localStorage.getItem("access");
  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.BOOKINGS}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    items.value = response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};

onMounted(async () => {
  fetchBookings();
});
</script>

<template>
  <div class="mt-20 mr-3 ml-1">
    <Card>
      <CardHeader>
        <CardTitle>Manage Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead class="text-right"> Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in items" :key="item.id">
              <TableCell class="font-medium">
                {{ item.id }}
              </TableCell>
              <TableCell>{{ item.guest }}</TableCell>
              <TableCell>{{ item.room }}</TableCell>
              <TableCell>
                {{ item.check_in }}
              </TableCell>
              <TableCell>
                {{ item.check_out }}
              </TableCell>
              <TableCell>
                {{ item.status }}
              </TableCell>
              <TableCell class="text-right">
                <button
                  @click="viewBooking(item.id)"
                  class="text-blue-500 hover:text-blue-800 border border-gray-200 rounded py-1 px-3"
                >
                  View
                </button>
              </TableCell>
              <TableCell class="text-right">
                <button
                  @click="editBooking(item.id)"
                  class="text-blue-500 hover:text-blue-800 border border-gray-200 rounded py-1 px-3"
                >
                  Edit
                </button>
              </TableCell>
              <TableCell class="text-right">
                <button
                  @click="deleteBooking(item.id)"
                  class="text-blue-500 hover:text-blue-800 border border-gray-200 rounded py-1 px-3"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
  <div>
    <DeleteBookingModal
      v-if="modals.deleteModal"
      v-model="modals.deleteModal"
      :bookingId="bookingId"
      :fetchBookings="fetchBookings"
    />
  </div>
  <div>
    <ViewBookingModal
      v-if="modals.viewModal"
      v-model="modals.viewModal"
      :bookingId="bookingId"
    />
  </div>
  <div>
    <EditBookingModal
      v-if="modals.editModel"
      v-model="modals.editModel"
      :bookingId="bookingId"
      :fetchBookings="fetchBookings"
    />
  </div>
</template>
