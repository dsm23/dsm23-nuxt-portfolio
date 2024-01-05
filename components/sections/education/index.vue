<script setup lang="ts">
  import type { EducationSchool } from "~/generated/generated";
  import formatYears from "~/utils/format-years";
  import { documentToVueComponents } from "~/utils/rich-text-vue-renderer";
  import contentfulOptions from "~/utils/content-options/";

  import styles from "./styles.module.css";

  const { education } = defineProps({
    education: {
      type: Array<EducationSchool>,
      default: [],
    },
  });
</script>

<template>
  <Section>
    <h2 class="text-5xl">Education</h2>

    <div
      :class="styles.container"
      v-for="{ schoolName, description, endDate, startDate } in education"
      :key="`education-${schoolName}`"
    >
      <h3 :class="styles.school">{{ schoolName }}</h3>
      <div :class="styles.description">
        <component
          :is="documentToVueComponents(description?.json, contentfulOptions)"
        />
      </div>

      <div :class="styles.dates">
        {{ formatYears(startDate ?? "", endDate ?? "") }}
      </div>
    </div>
  </Section>
</template>
