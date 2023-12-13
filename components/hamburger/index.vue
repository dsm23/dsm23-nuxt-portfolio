<script setup lang="ts">
  import styles from "./styles.module.css";

  const { open } = defineProps({
    open: {
      type: Boolean,
      default: true,
    },
  });
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    :class="[styles.hamburger, { [styles.open]: open }]"
    viewBox="0 0 100 100"
  >
    <rect
      :class="[styles.line, styles.top]"
      width="80"
      height="10"
      x="10"
      y="20"
      rx="5"
    />
    <rect
      :class="[styles.line, styles.middle]"
      width="80"
      height="10"
      x="10"
      y="45"
      rx="5"
    />
    <rect
      :class="[styles.line, styles.bottom]"
      width="80"
      height="10"
      x="10"
      y="70"
      rx="5"
    />
  </svg>
</template>
