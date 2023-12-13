<script setup lang="ts">
  import { useClickOutside } from "../../hooks/useClickOutside";

  const { open, onClose, onToggle } = defineProps({
    open: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function,
      required: true,
    },
    onToggle: {
      type: Function,
      required: true,
    },
  });

  const container = ref<HTMLDivElement>();

  useClickOutside(container, () => {
    onClose();
  });

  //  const [profilePic] = createResource(async () => {
  //   return await getProfilePic();
  // });
</script>

<template>
  <div class="{styles.container}" ref="container">
    <NuxtLink
      href="/#home"
      class="inline-flex items-center border-2 border-transparent shadow-sm outline-none focus:border-yellow-500 lg:mb-4 lg:mr-0 lg:rounded-full lg:border-8 lg:border-sky-700"
    >
      <!-- <img
          src={profilePic()?.image?.url}
          class="aspect-square w-10 rounded-full object-cover lg:w-48"
          alt={profilePic()?.image?.description}
        /> -->

      <span
        class="ml-4 hidden text-xl font-bold tracking-wide text-white print:inline md:inline lg:hidden"
      >
        David Murdoch
      </span>
      <span
        class="ml-4 inline text-xl font-bold tracking-wide text-white print:hidden md:hidden"
      >
        DSM
      </span>
    </NuxtLink>
    <div class="{styles.icon}">
      <button
        aria-label="Open the navigation menu"
        @click="onToggle"
        class="flex items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none"
        aria-controls="primary-navigation"
        :aria-expanded="open"
      >
        <Hamburger class="h-6 w-6" :open="open" />
      </button>
    </div>

    <nav aria-label="Primary" class="{styles.sections}">
      <div class="h-0 overflow-hidden md:contents">
        <div class="pt-2 md:contents" ref="{mobileHeightRef}">
          <slot />
        </div>
      </div>
    </nav>
  </div>
</template>
