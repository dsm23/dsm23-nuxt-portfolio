<script setup lang="ts">
  useHead({
    title: "My App",
    meta: [
      { name: "description", content: "David Murdoch's Nuxt portfolio" },
      { name: "color-scheme", content: "light dark" },
    ],
  });
</script>

<template>
  <Layout>
    <Main>
      <NuxtPage />
    </Main>
  </Layout>
</template>
