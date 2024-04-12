<script setup lang="ts">
  import { computed } from "vue";
  import type { HTMLAttributes } from "vue";
  import { SelectScrollUpButton, useForwardProps } from "radix-vue";
  import type { SelectScrollUpButtonProps } from "radix-vue";
  import cn from "~/utils/class-names";

  const props = defineProps<
    SelectScrollUpButtonProps & { class?: HTMLAttributes["class"] }
  >();

  const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
  });

  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectScrollUpButton
    v-bind="forwardedProps"
    :class="
      cn('flex cursor-default items-center justify-center py-1', props.class)
    "
  >
    <slot>
      <SvgsChevronUp />
    </slot>
  </SelectScrollUpButton>
</template>
