<script setup lang="ts">
  import { getHomePageQuery } from "~/utils/api";

  const { data } = await useAsyncData("home", getHomePageQuery);

  const person = computed(() => data.value?.person);
  const education = computed(() => data.value?.education);
  const experience = computed(() => data.value?.experience);
  const skills = computed(() => data.value?.skills);
  const interests = computed(() => data.value?.interests);
</script>

<template>
  <h1 class="sr-only">David Murdoch's Portfolio</h1>

  <SectionsHome id="home" :author="person" />
  <Divisor />

  <!-- <SectionsExperience id="experience" experience="{experience()}" />
  <Divisor />

  <SectionsEducation id="education" education="{education()}" />
  <Divisor /> -->

  <SectionsSkills id="skills" :skills="skills" />
  <Divisor />
  <!-- <SectionsProjects id="projects" />  -->

  <Divisor />
  <SectionsInterests id="interests" :interests="interests" />

  <Divisor />
  <SectionsDownload id="download" />
</template>
