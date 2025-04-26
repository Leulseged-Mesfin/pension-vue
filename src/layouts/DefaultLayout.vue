<script setup lang="ts">
import { RouterView } from "vue-router";
import AppSidebar from "@/components/AppSidebar.vue";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="w-full">
      <div class="fixed mt-1">
        <SidebarTrigger />
      </div>
      <RouterView class="w-[90%] ml-10" />
    </main>
  </SidebarProvider>
</template>
