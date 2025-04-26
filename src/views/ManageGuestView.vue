<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteGuestModal from "@/modals/DeleteGuestModal.vue";
import ViewGuestModal from "@/modals/ViewGuestModal.vue";
import EditGuestModal from "@/modals/EditGuestModal.vue";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/utils/apiConfig";

const items = ref([]);

const route = useRoute();

const guestId = ref(0);

const modals = reactive({
  deleteModal: false,
  viewModal: false,
  editModel: false,
});

const deleteGuest = async (id) => {
  guestId.value = id;
  modals.deleteModal = true;
};

const viewGuest = async (id) => {
  guestId.value = id;
  modals.viewModal = true;
};

const editGuest = async (id) => {
  guestId.value = id;
  modals.editModel = true;
};

const fetchGuests = async () => {
  const token = localStorage.getItem("access");
  try {
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GUESTS}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    items.value = response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};

onMounted(async () => {
  fetchGuests();
});
</script>

<template>
  <div class="mt-20 mr-3 ml-1">
    <Card>
      <CardHeader>
        <CardTitle class="text-xl">Manage Guests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Id Document</TableHead>
              <TableHead>Address</TableHead>
              <TableHead class="text-right"> Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in items" :key="item.id">
              <TableCell class="font-medium">
                {{ item.id }}
              </TableCell>
              <TableCell>{{ item.full_name }}</TableCell>
              <TableCell>{{ item.phone_number }}</TableCell>
              <TableCell>
                {{ item.email }}
              </TableCell>
              <TableCell>
                {{ item.id_document }}
              </TableCell>
              <TableCell>
                {{ item.address }}
              </TableCell>
              <TableCell class="text-right">
                <button
                  @click="viewGuest(item.id)"
                  class="text-blue-500 hover:text-blue-800 border border-gray-200 rounded py-1 px-3"
                >
                  View
                </button>
              </TableCell>
              <TableCell class="text-right">
                <button
                  @click="editGuest(item.id)"
                  class="text-blue-500 hover:text-blue-800 border border-gray-200 rounded py-1 px-3"
                >
                  Edit
                </button>
              </TableCell>
              <TableCell class="text-right">
                <button
                  @click="deleteGuest(item.id)"
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
    <DeleteGuestModal
      v-if="modals.deleteModal"
      v-model="modals.deleteModal"
      :guestId="guestId"
      :fetchGuests="fetchGuests"
    />
  </div>
  <div>
    <ViewGuestModal
      v-if="modals.viewModal"
      v-model="modals.viewModal"
      :guestId="guestId"
    />
  </div>
  <div>
    <EditGuestModal
      v-if="modals.editModel"
      v-model="modals.editModel"
      :guestId="guestId"
      :fetchGuests="fetchGuests"
    />
  </div>
</template>
