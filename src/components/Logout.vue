<script setup>
import AppSidebar from "./AppSidebar.vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const logout = () => {
  console.log("Clicked from AppSidebar of Logout Component");
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  axios.defaults.headers.common["Authorization"] = undefined;
  router.push("/login");
};
</script>

<template>
  <!-- <AppSidebar :logout="logout" /> -->
</template>
