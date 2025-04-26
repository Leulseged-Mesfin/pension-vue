<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import DeleteRoomModal from "@/modals/DeleteRoomModal.vue";
import ViewRoomModal from "@/modals/ViewRoomModal.vue";
import EditRoomModal from "@/modals/EditRoomModal.vue";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/utils/apiConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const items = ref([]);

const route = useRoute();

const roomId = ref(0);

const modals = reactive({
  deleteModal: false,
  viewModal: false,
  editModel: false,
});

const deleteRoom = async (id) => {
  roomId.value = id;
  modals.deleteModal = true;
};

const viewRoom = async (id) => {
  roomId.value = id;
  modals.viewModal = true;
};

const editRoom = async (id) => {
  roomId.value = id;
  modals.editModel = true;
};

const fetchRooms = async () => {
  const token = localStorage.getItem("access");
  try {
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.ROOMS}`, {
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
  fetchRooms();
});
</script>

<template>
  <div class="mt-20 mr-3 ml-1">
    <Card>
      <CardHeader>
        <CardTitle>Manage Room</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Room Number</TableHead>
              <TableHead>Room Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Floor</TableHead>
              <TableHead>Price per Night</TableHead>
              <TableHead class="text-right"> Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in items" :key="item.id">
              <TableCell class="font-medium">
                {{ item.id }}
              </TableCell>
              <TableCell>{{ item.number }}</TableCell>
              <TableCell>{{ item.room_type }}</TableCell>
              <TableCell>
                {{ item.status }}
              </TableCell>
              <TableCell>
                {{ item.floor }}
              </TableCell>
              <TableCell>
                {{ item.price_per_night }}
              </TableCell>
              <TableCell class="text-right">
                <button
                  @click="viewRoom(item.id)"
                  class="text-blue-500 hover:text-blue-800 border border-gray-200 rounded py-1 px-3"
                >
                  View
                </button>
              </TableCell>
              <TableCell class="text-right">
                <button
                  @click="editRoom(item.id)"
                  class="text-blue-500 hover:text-blue-800 border border-gray-200 rounded py-1 px-3"
                >
                  Edit
                </button>
              </TableCell>
              <TableCell class="text-right">
                <button
                  @click="deleteRoom(item.id)"
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
    <DeleteRoomModal
      v-if="modals.deleteModal"
      v-model="modals.deleteModal"
      :roomId="roomId"
      :fetchRooms="fetchRooms"
    />
  </div>
  <div>
    <ViewRoomModal
      v-if="modals.viewModal"
      v-model="modals.viewModal"
      :roomId="roomId"
    />
  </div>
  <div>
    <EditRoomModal
      v-if="modals.editModel"
      v-model="modals.editModel"
      :roomId="roomId"
      :fetchRooms="fetchRooms"
    />
  </div>
</template>
