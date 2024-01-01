<script setup lang="ts">
  import styles from "./styles.module.css";
</script>

<template>
  <div
    data-tip-position="top"
    inert="true"
    role="tooltip"
    :class="styles.tooltip"
  >
    <slot />
  </div>
</template>
