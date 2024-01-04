<script setup lang="ts">
  import type { ExperienceCompany } from "~/generated/generated";
  import formatYears from "~/utils/format-years";
  import { documentToVueComponents } from "~/utils/rich-text-vue-renderer";
  import contentfulOptions from "~/utils/content-options/";

  import styles from "./styles.module.css";

  const { experience } = defineProps({
    experience: {
      type: Array<ExperienceCompany>,
      default: [],
    },
  });
</script>

<template>
  <Section>
    <h2 class="text-5xl">Experience</h2>

    <div
      v-for="{
        companyName,
        city,
        description,
        endDate,
        startDate,
      } in experience"
      :key="`company-name-${companyName}`"
      :class="styles.container"
    >
      <h3 :class="styles.company">{{ companyName }}</h3>
      <div :class="styles.city">{{ city }}</div>
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
