<script setup lang="ts">
  import { computed } from "vue";
  import type { HTMLAttributes } from "vue";
  import { SelectGroup } from "radix-vue";
  import type { SelectGroupProps } from "radix-vue";
  import cn from "~/utils/class-names";

  const props = defineProps<
    SelectGroupProps & { class?: HTMLAttributes["class"] }
  >();

  const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
  });
</script>

<template>
  <SelectGroup :class="cn('w-full p-1', props.class)" v-bind="delegatedProps">
    <slot />
  </SelectGroup>
</template>
