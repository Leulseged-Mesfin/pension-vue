<script setup>
import Chart from "@/components/Chart.vue";
import Hero from "@/components/Hero.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { onMounted, ref, reactive } from "vue";
import AppSidebar from "@/components/AppSidebar.vue";
import {
  API_BASE_URL_LOGIN,
  API_ENDPOINTS,
  API_BASE_PROFILE,
} from "@/utils/apiConfig";

const route = useRouter();

const message = ref("");

const user = ref({});

const fetchProtected = async () => {
  const token = localStorage.getItem("access");

  try {
    const response = await axios.get(
      `${API_BASE_PROFILE}${API_ENDPOINTS.PROTECTED}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    message.value = response.data.message;
  } catch (err) {
    // message.value = "Access denied. Please log in again.";
    route.push("/");
  }
};

const fetchUser = async () => {
  const token = localStorage.getItem("access");

  try {
    const response = await axios.get(
      `${API_BASE_PROFILE}${API_ENDPOINTS.PROFILE}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    user.value = response.data.data;
  } catch (err) {
    console.log(err);
  }
};

onMounted(async () => {
  fetchUser();
  fetchProtected();
});
</script>

<template>
  <div
    v-if="message == 'Hello, you are authenticated!'"
    class="flex flex-col gap-4"
  >
    <h1 class="text-2xl font-bold mb-2 mt-5 text-center">Dashboard</h1>
    <p class="text-center">{{ message }}</p>
    <p>Welcom "{{ user.name }}"!</p>
    <AppSidebar />
    <Hero />
    <Chart />
  </div>
  <div v-else class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold mb-2 mt-5 text-center">{{ message }}</h1>
  </div>
</template>
