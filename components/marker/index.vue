<script setup lang="ts">
  const { isMajor, radial } = defineProps({
    isMajor: {
      type: Boolean,
      default: false,
    },
    radial: {
      type: Number,
      default: 0,
    },
  });

  const className = computed(() =>
    isMajor ? "stroke-[#999] stroke-[0.5px]" : "stroke-[#333] stroke-[1px]",
  );
  const y1 = computed(() => (isMajor ? 35 : 42));
  const transform = computed(
    () => `rotate(${isMajor ? 30 * radial : 6 * radial})`,
  );
</script>

<template>
  <line :class="className" :y1="y1" y2="45" :transform="transform" />
</template>
