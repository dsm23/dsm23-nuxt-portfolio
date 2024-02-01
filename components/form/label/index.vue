<script lang="ts" setup>
  import { twMerge } from "tailwind-merge";
  import type { ClassNameValue } from "tailwind-merge";
  import { Label } from "radix-vue";
  import { useFormField } from "../useFormField";

  const props = defineProps({
    class: {
      type: [String, Object] as PropType<ClassNameValue>,
    },
  });

  const { error, formItemId } = useFormField();

  const classes = twMerge(
    "text-foreground block text-left text-sm font-medium tracking-tight",
    error.value && "text-destructive",
    props.class ?? "",
  );
</script>

<template>
  <Label :class="classes" :for="formItemId">
    <slot />
  </Label>
</template>
