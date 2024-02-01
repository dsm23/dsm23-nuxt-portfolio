<script lang="ts" setup>
  import { twMerge } from "tailwind-merge";
  import type { ClassNameValue } from "tailwind-merge";
  import { useFormField } from "../useFormField";

  const props = defineProps({
    class: {
      type: [String, Object] as PropType<ClassNameValue>,
    },
  });

  const { formDescriptionId } = useFormField();

  const classes = twMerge(
    "text-[0.8rem] text-muted-foreground",
    props.class ?? "",
  );
</script>

<template>
  <p :id="formDescriptionId" :class="classes">
    <slot />
  </p>
</template>
