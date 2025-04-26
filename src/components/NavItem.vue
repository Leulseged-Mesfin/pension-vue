<script setup>
import { RouterLink } from "vue-router";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <!-- If item has no children, use RouterLink for navigation -->
  <RouterLink
    v-if="!item.children.length"
    :to="item.href"
    class="flex items-center gap-2 text-gray-700 hover:bg-gray-300 p-2 rounded"
  >
    <span v-if="item.icon" class="inline-block w-6">
      <component :is="item.icon" class="h6 w-auto" />
    </span>
    {{ item.label }}
  </RouterLink>

  <!-- If item has children, use Disclosure -->
  <Disclosure v-else>
    <DisclosureButton
      class="flex items-center gap-2 text-gray-700 hover:bg-gray-300 p-2 rounded w-full"
    >
      <span v-if="item.icon" class="inline-block w-6">
        <component :is="item.icon" class="h6 w-auto" />
      </span>
      {{ item.label }}
    </DisclosureButton>

    <DisclosurePanel class="ml-4">
      <NavItem
        v-for="child in item.children"
        :key="child.label"
        :item="child"
      />
    </DisclosurePanel>
  </Disclosure>
</template>
