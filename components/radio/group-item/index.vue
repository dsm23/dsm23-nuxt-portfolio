<script setup lang="ts">
  import { computed } from "vue";
  import type { HTMLAttributes } from "vue";
  import {
    RadioGroupIndicator,
    RadioGroupItem,
    useForwardProps,
  } from "radix-vue";
  import type { RadioGroupItemProps } from "radix-vue";
  import cn from "~/utils/class-names";

  const props = defineProps<
    RadioGroupItemProps & { class?: HTMLAttributes["class"] }
  >();

  const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
  });

  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <RadioGroupItem
    v-bind="forwardedProps"
    :class="
      cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <RadioGroupIndicator
      class="relative flex h-full w-full items-center justify-center after:block after:h-[8px] after:w-[8px] after:rounded-[50%] after:bg-foreground after:content-['']"
    />
  </RadioGroupItem>
</template>
