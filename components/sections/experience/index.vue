import { For, splitProps } from "solid-js"; import type { Component, JSX } from
"solid-js"; import Section from "~/components/section"; import {
contentfulOptions, formatYears } from "~/utils"; import {
documentToSolidComponents } from "~/utils/rich-text-solid-renderer";

<script setup lang="ts">
  import formatYears from "~/utils/format-years";
  import styles from "./styles.module.css";
  import { documentToVueComponents } from "~/utils/rich-text-vue-renderer";
  import contentfulOptions from "~/utils/content-options/";

  const { experiences } = defineProps({
    experiences: {
      type: Array,
      default: [],
    },
  });
  // interface Props extends HTMLAttributes<HTMLElement> {
  //   experiences: Queries.ContentfulExperienceCompany[];
  // }
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
      } in experiences"
      :key="companyName"
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
        {{ formatYears(startDate, endDate) }}
      </div>
    </div>
  </Section>
</template>
