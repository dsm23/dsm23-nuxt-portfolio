<script setup lang="ts">
  import { twMerge } from "tailwind-merge";
  import type { ClassNameValue } from "tailwind-merge";

  const props = defineProps({
    as: {
      type: [String, Object] as PropType<
        keyof HTMLElementTagNameMap | Component
      >,
      default: resolveComponent("NuxtLink"),
    },
    class: {
      type: [String, Object] as PropType<ClassNameValue>,
    },
  });

  const classes = twMerge(
    "-mx-1 px-1 text-sky-900 outline-none hover:underline focus:rounded focus:bg-yellow-500 dark:text-sky-300 print:underline",
    props.class,
  );
</script>

<template>
  <component :is="props.as" :class="classes">
    <slot />
  </component>
</template>
