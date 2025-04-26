<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router"; // ✅ add router
import AppSidebar from "@/components/AppSidebar.vue";
import { API_BASE_URL_LOGIN, API_ENDPOINTS } from "@/utils/apiConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");

// console.log(email.value);

const login = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL_LOGIN}${API_ENDPOINTS.LOGIN}`,
      {
        email: email.value,
        password: password.value,
      }
    );

    const access = response.data.access;
    const refresh = response.data.refresh;

    // ✅ Store tokens manually
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    // ✅ Optional: use this for future axios calls if needed
    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    router.push("/dashboard"); // Go to dashboard or home
  } catch (err) {
    error.value = "Invalid credentials";
    console.error("Login error:", err);
  }
};
</script>

<template>
  <Card class="w-[500px] mx-auto mt-40 flex items-center justify-center">
    <CardHeader>
      <CardTitle class="text-xl text-center">Login</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="login">
        <div class="mb-4">
          <Label for="email">Email</Label>
          <Input
            v-model="email"
            type="email"
            id="email"
            class="w-[400px] mt-1"
            required
          />
        </div>
        <div class="mb-4">
          <Label for="password">Password</Label>
          <Input
            v-model="password"
            type="password"
            id="password"
            class="w-[400px] mt-1"
            required
          />
        </div>
        <p v-if="error" class="text-red-600 text-sm mb-2">{{ error }}</p>
        <Button
          type="submit"
          class="w-[200px] flex items-center justify-center mx-auto mt-1"
          >Login</Button
        >
      </form>
    </CardContent>
  </Card>
</template>
