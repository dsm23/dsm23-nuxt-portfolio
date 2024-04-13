<script lang="ts" setup>
  import { computed } from "vue";
  import type { HTMLAttributes } from "vue";
  import { CalendarNext, useForwardProps } from "radix-vue";
  import type { CalendarNextProps } from "radix-vue";
  import cn from "~/utils/class-names";
  import { buttonVariants } from "~/components/button";

  const props = defineProps<
    CalendarNextProps & { class?: HTMLAttributes["class"] }
  >();

  const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
  });

  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <CalendarNext
    :class="
      cn(
        buttonVariants({ variant: 'outline' }),
        'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot>
      <SvgsChevronRight class="h-4 w-4" />
    </slot>
  </CalendarNext>
</template>
