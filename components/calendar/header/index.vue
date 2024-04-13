<script lang="ts" setup>
  import { computed } from "vue";
  import type { HTMLAttributes } from "vue";
  import { CalendarHeader, useForwardProps } from "radix-vue";
  import type { CalendarHeaderProps } from "radix-vue";
  import cn from "~/utils/class-names";

  const props = defineProps<
    CalendarHeaderProps & { class?: HTMLAttributes["class"] }
  >();

  const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
  });

  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <CalendarHeader
    :class="
      cn('relative flex w-full items-center justify-between pt-1', props.class)
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeader>
</template>
