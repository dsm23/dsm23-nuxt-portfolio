<script setup lang="ts">
  import type { Skill } from "~/generated/generated";

  import styles from "./styles.module.css";

  const { skills } = defineProps({
    skills: {
      type: Array<Skill>,
      default: [],
    },
  });
</script>

<template>
  <Section>
    <h2 class="text-5xl">Skills</h2>
    <div class="flex flex-wrap items-baseline">
      <NuxtLink
        :href="`/skill/${item.slug}`"
        class="group"
        v-for="item in skills"
        :key="item.skillName ?? ''"
      >
        <span class="sr-only">{{ item.skillName }}</span>

        <SvgLoader
          :class="[
            styles.iconWrapper,
            'h-16 w-16 text-gray-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400',
          ]"
          :src="item.icon?.url ?? ''"
        />

        <Tooltip>{{ item.skillName }}</Tooltip>
      </NuxtLink>
    </div>
  </Section>
</template>
