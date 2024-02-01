<script setup lang="ts">
  import { useClickOutside } from "../../hooks/useClickOutside";
  import { getProfilePic } from "~/utils/api";

  import styles from "./styles.module.css";

  const { open } = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits<{
    (e: "close"): void;
    (e: "toggle"): void;
  }>();

  const container = ref<HTMLDivElement>();

  useClickOutside(container, () => {
    emit("close");
  });

  const { data } = useAsyncData(getProfilePic);

  const src = computed(() => data.value?.image?.url as string | undefined);
  const alt = computed(
    () => data.value?.image?.description as string | undefined,
  );
</script>

<template>
  <div :class="styles.container" ref="container">
    <NuxtLink
      href="/#home"
      class="inline-flex items-center border-2 border-transparent shadow-sm outline-none focus:border-yellow-500 lg:mb-4 lg:mr-0 lg:rounded-full lg:border-8 lg:border-sky-700"
    >
      <NuxtImg
        :src="src"
        class="aspect-square w-10 rounded-full object-cover lg:w-48"
        :alt="alt"
        format="webp"
        height="192"
        width="192"
        sizes="40px lg:192px"
        placeholder
      />

      <span
        class="ml-4 hidden text-xl font-bold tracking-wide text-white md:inline lg:hidden print:inline"
      >
        David Murdoch
      </span>
      <span
        class="ml-4 inline text-xl font-bold tracking-wide text-white md:hidden print:hidden"
      >
        DSM
      </span>
    </NuxtLink>
    <div :class="styles.icon">
      <button
        aria-label="Open the navigation menu"
        @click="$emit('toggle')"
        class="flex items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none"
        aria-controls="primary-navigation"
        :aria-expanded="open"
      >
        <Hamburger class="h-6 w-6" :open="open" />
      </button>
    </div>

    <nav aria-label="Primary" :class="styles.sections">
      <Transition
        class="grid pt-2 md:hidden"
        enter-active-class="transition-[grid-template-rows] motion-reduce:transition-none duration-150"
        enter-from-class="grid-rows-[0fr]"
        enter-to-class="grid-rows-[1fr]"
        leave-active-class="transition-[grid-template-rows] motion-reduce:transition-none duration-150"
        leave-from-class="grid-rows-[1fr]"
        leave-to-class="grid-rows-[0fr]"
      >
        <div v-if="open">
          <div id="primary-navigation" class="overflow-hidden">
            <slot />
          </div>
        </div>
      </Transition>
      <div class="hidden md:block">
        <slot />
      </div>
    </nav>
  </div>
</template>
