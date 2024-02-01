<script lang="ts" setup>
  import { Toaster as Sonner } from "vue-sonner";
  import type { ToasterProps } from "vue-sonner";

  const props = defineProps<ToasterProps>();
  // :class-names="{
  //   toast:
  //     'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
  //   description: 'group-[.toast]:text-muted-foreground',
  //   actionButton:
  //     'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
  //   cancelButton:
  //     'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
  // }"
</script>

<template>
  <Sonner
    class="toaster group"
    :toastOptions="{
      className:
        'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
      descriptionClassName: 'group-[.toast]:text-muted-foreground',
    }"
    v-bind="props"
  />
</template>
