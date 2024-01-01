<script setup>
  import styles from "./styles.module.css";
</script>

<template>
  <section :class="styles.section">
    <div :class="styles.centering">
      <div
        class="min-w-full flex-grow-0 px-4 py-8 lg:flex-grow lg:px-32 lg:py-64"
      >
        <slot />
      </div>
    </div>
  </section>
</template>
