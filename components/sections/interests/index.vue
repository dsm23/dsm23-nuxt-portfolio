<script setup lang="ts">
  const { interests } = defineProps({
    interests: {
      type: Array<string>,
      default: [],
    },
  });
</script>

<template>
  <Section>
    <h2 class="text-5xl">Interests</h2>
    <ul class="list-inside list-disc">
      <li v-for="{ interest } in interests" :key="interest" class="ml-4">
        {{ interest }}
      </li>
    </ul>
  </Section>
</template>
