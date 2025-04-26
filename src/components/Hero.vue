<script setup></script>

<template>
  <section class="bg-gray-100 py-20">
    <div class="container mx-auto flex flex-col md:flex-row items-center px-6">
      <!-- Left Side: Text -->
      <div class="md:w-1/2 text-center md:text-left">
        <h1 class="text-4xl font-semiabold text-gray-900 leading-tight">
          Simplify Your Inventory Management
        </h1>
        <p class="text-gray-600 text-lg mt-4">
          Track orders, manage stock, and optimize sales with ease.
        </p>
        <div class="mt-9">
          <a
            href="/"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>
      </div>

      <!-- Right Side: Image -->
      <div class="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src="@/assets/images/logo.jpg"
          alt="Inventory Dashboard"
          class="w-3/4 shadow-lg rounded-lg"
        />
      </div>
    </div>
  </section>
</template>
