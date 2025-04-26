<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section>
    <div class="container py-6 px-6">
      <RouterLink
        to="/products/manage"
        class="text-green-500 hover:text-green-600 flex items-center"
      >
        <i class="pi pi-arrow-circle-left mr-3"></i> Back to Products
      </RouterLink>
    </div>
  </section>
</template>
