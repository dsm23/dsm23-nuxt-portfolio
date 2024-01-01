<script setup lang="ts">
  const { src } = defineProps({
    src: {
      type: String,
      required: true,
    },
  });

  const fetchSvg = async (url: string) => {
    const res = await fetch(url, {
      headers: new Headers({
        Accept: "image/svg+xml",
      }),
    });

    return await res.text();
  };

  const { data: icon } = await useAsyncData(
    `svg-${src}`,
    async () => await fetchSvg(src),
  );
</script>

<template>
  <div v-html="icon" />
</template>
