<script lang="ts">
  import type { InjectionKey } from "vue";

  export const FORM_ITEM_INJECTION_KEY = Symbol() as InjectionKey<string>;
</script>

<script lang="ts" setup>
  import { provide } from "vue";
  import { twMerge } from "tailwind-merge";
  import type { ClassNameValue } from "tailwind-merge";
  import { useId } from "radix-vue";

  const props = defineProps({
    class: {
      type: [String, Object] as PropType<ClassNameValue>,
    },
  });

  const id = useId();
  provide(FORM_ITEM_INJECTION_KEY, id);

  const classes = twMerge("space-y-2", props.class ?? "");
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
