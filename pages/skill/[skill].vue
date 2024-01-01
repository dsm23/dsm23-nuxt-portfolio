<script setup lang="ts">
  import { getSkillBySlug } from "../../utils/api";
  import { documentToVueComponents } from "../../utils/rich-text-vue-renderer";
  import contentfulOptions from "../../utils/content-options/";

  const route = useRoute();

  const { data: skill } = await useAsyncData(
    async () => await getSkillBySlug(route.params.skill as string),
  );

  const skillName = computed(() => skill?.value.skillName);
  const content = computed(() => skill?.value.content);
  const rating = computed(() => skill?.value.rating);
</script>

<template>
  <Main class="w-full px-6 py-8">
    <GoBack class="mb-4" href="/#skills" />

    <h1 class="text-4xl text-sky-700">{{ skillName }}</h1>
    <div class="mb-4">
      <component
        :is="documentToVueComponents(content?.json, contentfulOptions)"
      />
    </div>

    <div class="flex">
      <h2 class="tracking-widest text-sky-600">PROFICIENCY:</h2>

      <SvgsFilledStar
        v-for="i in Array.from({ length: rating })"
        :key="`filled-${i}`"
        class="h-6 w-6"
      />

      <SvgsEmptyStar
        v-for="i in Array.from({ length: 5 - rating })"
        :key="`empty-${i}`"
        class="h-6 w-6"
      />
    </div>
  </Main>
</template>
