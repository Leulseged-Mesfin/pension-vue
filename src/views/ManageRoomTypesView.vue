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
import ViewRoomTypeModal from "@/modals/ViewRoomTypeModal.vue";
import DeleteRoomTypeModal from "@/modals/DeleteRoomTypeModal.vue";
import EditRoomTypeModal from "@/modals/EditRoomTypeModal.vue";

import axios from "axios";
import {
  API_BASE_URL,
  API_BASE_URL_LOGIN,
  API_ENDPOINTS,
} from "@/utils/apiConfig";

const route = useRoute();

const items = ref([]);

const roomTypeId = ref(0);

const modals = reactive({
  deleteModal: false,
  viewModal: false,
  editModal: false,
});

const deleteRoomType = async (id) => {
  roomTypeId.value = id;
  modals.deleteModal = true;
};

const viewRoomType = async (id) => {
  roomTypeId.value = id;
  modals.viewModal = true;
};

const editRoomType = async (id) => {
  roomTypeId.value = id;
  modals.editModal = true;
};

const fetchRoomType = async () => {
  const token = localStorage.getItem("access");

  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.ROOM_TYPES}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    items.value = response.data;
  } catch (error) {
    console.error("Error fetching job:", error);
  }
};

onMounted(async () => {
  fetchRoomType();
});
</script>

<template>
  <div class="mt-20 mr-3 ml-1">
    <Card>
      <CardHeader>
        <CardTitle class="text-xl">Manage Room Types</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead class="text-right"> Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in items" :key="item.id">
              <TableCell class="font-medium">
                {{ item.id }}
              </TableCell>
              <TableCell>{{ item.name }}</TableCell>
              <TableCell>{{ item.description }}</TableCell>
              <TableCell>
                {{ item.base_price }}
              </TableCell>
              <TableCell class="text-right">
                <button
                  @click="viewRoomType(item.id)"
                  class="text-blue-500 hover:text-blue-800 border border-gray-200 rounded py-1 px-3"
                >
                  View
                </button>
              </TableCell>
              <TableCell class="text-right">
                <button
                  @click="editRoomType(item.id)"
                  class="text-blue-500 hover:text-blue-800 border border-gray-200 rounded py-1 px-3"
                >
                  Edit
                </button>
              </TableCell>
              <TableCell class="text-right">
                <button
                  @click="deleteRoomType(item.id)"
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
    <DeleteRoomTypeModal
      v-if="modals.deleteModal"
      v-model="modals.deleteModal"
      :roomTypeId="roomTypeId"
      :fetchRoomType="fetchRoomType"
    />
  </div>
  <div>
    <ViewRoomTypeModal
      v-if="modals.viewModal"
      v-model="modals.viewModal"
      :roomTypeId="roomTypeId"
    />
  </div>
  <div>
    <EditRoomTypeModal
      v-if="modals.editModal"
      v-model="modals.editModal"
      :roomTypeId="roomTypeId"
      :fetchRoomType="fetchRoomType"
    />
  </div>
</template>
