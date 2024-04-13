<script lang="ts" setup>
  import { computed } from "vue";
  import type { HTMLAttributes } from "vue";
  import { CalendarHeadCell, useForwardProps } from "radix-vue";
  import type { CalendarHeadCellProps } from "radix-vue";
  import cn from "~/utils/class-names";

  const props = defineProps<
    CalendarHeadCellProps & { class?: HTMLAttributes["class"] }
  >();

  const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
  });

  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <CalendarHeadCell
    :class="
      cn(
        'w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeadCell>
</template>
