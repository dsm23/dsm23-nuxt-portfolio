<script setup lang="ts">
  import styles from "./styles.module.css";

  const route = useRoute();
  const open = ref(false);

  const handleToggle = () => {
    open.value = !open.value;
  };

  const handleClose = () => {
    open.value = false;
  };

  const rootPath = `/`;

  const isIndexPage = computed(() => route.path === rootPath);

  const items = [
    "home",
    "experience",
    "education",
    "skills",
    "projects",
    "interests",
    "download",
  ];
</script>

<template>
  <div class="flex w-full flex-col font-sans lg:flex-row">
    <header class="contents">
      <Nav :open="open" @toggle="handleToggle" @close="handleClose">
        <div
          class="block w-full text-gray-400 md:ml-auto md:flex md:w-auto md:items-start lg:block lg:h-auto lg:items-center"
        >
          <NuxtLink
            :href="`/#${label}`"
            :key="label"
            :class="[styles.navLink, 'group']"
            v-for="label in items"
          >
            <span
              :class="[
                styles.navSpan,
                'px-px py-px text-gray-400 group-focus:bg-yellow-500 group-focus:text-gray-900 lg:px-0.5',
              ]"
            >
              {{ label }}
            </span>
          </NuxtLink>
        </div>
      </Nav>
    </header>
    <div class="w-full">
      <slot />
    </div>
  </div>
</template>
