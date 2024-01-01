<script setup lang="ts">
  const { as } = defineProps({
    as: {
      type: String,
      default: "h2",
    },
  });
</script>

<template>
  <component :is="as" class="text-6xl font-medium text-gray-900">
    <slot />
  </component>
</template>
