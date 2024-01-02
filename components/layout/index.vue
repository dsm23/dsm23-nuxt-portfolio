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
      <Nav :open="open" :on-toggle="handleToggle" :on-close="handleClose">
        <div
          class="block w-full text-gray-400 md:ml-auto md:flex md:w-auto md:items-start lg:block lg:h-auto lg:items-center"
          v-if="isIndexPage"
        >
          <a
            :href="`/#${label}`"
            v-for="label in items"
            v-bind:key="label"
            :class="[
              styles.navLink,
              'group flex w-full items-center justify-start rounded py-2 uppercase hover:bg-gray-900 hover:text-white focus:outline-none lg:justify-center',
            ]"
          >
            <span
              v-bind:key="label"
              :class="[
                styles.navSpan,
                'px-px py-px group-focus:bg-yellow-500 group-focus:text-gray-900 lg:px-0.5',
              ]"
            >
              {{ label }}
            </span>
          </a>
        </div>

        <div v-if="!isIndexPage">
          <NuxtLink
            v-bind:key="label"
            :href="`/#${label}`"
            :class="[
              styles.navLink,
              'group flex w-full items-center justify-start rounded py-2 uppercase hover:bg-gray-900 hover:text-white focus:outline-none lg:justify-center',
            ]"
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
      <Main>
        <slot />
      </Main>
    </div>
  </div>
</template>
