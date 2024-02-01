<script setup lang="ts">
  import type { InputHTMLAttributes } from "vue";
  import { twMerge } from "tailwind-merge";

  defineOptions({
    inheritAttrs: false,
  });

  const { id, label } = defineProps({
    id: {
      type: String as PropType<InputHTMLAttributes["id"]>,
    },
    label: {
      type: String,
      required: true,
    },
    labelClasses: {
      type: String,
    },
  });
</script>

<template>
  <label :class="twMerge('block', labelClasses)" :for="id">
    {{ label }}
  </label>
  <input :id="id" {...$attrs} />
</template>
