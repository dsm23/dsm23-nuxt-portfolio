<script setup lang="ts">
  import type { Person } from "~/generated/generated";

  const { author } = defineProps({
    author: {
      type: Object as PropType<Person>,
      default: {},
    },
  });

  const firstName = computed(() => author?.firstName);
  const lastName = computed(() => author?.lastName);
  const email = computed(() => author?.email);
  const phone = computed(() => author?.phone);
  const codesandbox = computed(() => author?.codesandbox ?? "");
  const github = computed(() => author?.github ?? "");
  const shortBio = computed(() => author?.shortBio);
</script>

<template>
  <Section>
    <SectionHeader>
      <span class="text-gray-900 dark:text-white">{{ firstName }}</span
      >{{ " " }}
      <span class="text-sky-900 dark:text-sky-300">{{ lastName }}</span>
    </SectionHeader>
    <address>
      London-based · {{ phone }} ·{{ " " }}
      <Anchor :href="`mailto:${email}`">{{ email }}</Anchor>
    </address>
    <p class="mt-4 text-gray-900 dark:text-white">{{ shortBio }}</p>
    <div class="ml-6 mt-4 grid justify-start space-y-4">
      <a
        :href="github"
        aria-label="GitHub"
        class="flex transform items-center justify-between gap-x-4 rounded-full bg-gray-900 px-4 py-2 text-white transition duration-500 ease-in-out hover:scale-125 hover:bg-sky-900 focus-visible:scale-125 focus-visible:bg-sky-900"
        rel="noopener noreferrer"
        target="_blank"
      >
        <SvgsGithub class="h-6 w-6" />
        GitHub/dsm23
        <SvgsArrowTopRightOnSquare class="h-4 w-4" />
      </a>
      <a
        :href="codesandbox"
        aria-label="CodeSandbox"
        class="flex transform items-center justify-between gap-x-4 rounded-full bg-gray-900 px-4 py-2 text-white transition duration-500 ease-in-out hover:scale-125 hover:bg-sky-900 focus-visible:scale-125 focus-visible:bg-sky-900"
        rel="noopener noreferrer"
        target="_blank"
      >
        <SvgsCodeSandbox class="h-6 w-6" />
        CodeSandbox/dsm23
        <SvgsArrowTopRightOnSquare class="h-4 w-4" />
      </a>

      <a
        href="https://react-david-murdoch-portfolio.netlify.app/"
        class="flex transform items-center justify-between gap-x-4 rounded-full bg-gray-900 px-4 py-2 text-white transition duration-500 ease-in-out hover:scale-125 hover:bg-sky-900 focus-visible:scale-125 focus-visible:bg-sky-900"
        rel="noopener noreferrer"
        target="_blank"
      >
        <SvgsGatsby class="h-6 w-6" />
        React Gatsby portfolio
        <SvgsArrowTopRightOnSquare class="h-4 w-4" />
      </a>
      <a
        href="https://dsm23-next-portfolio.vercel.app/"
        class="flex transform items-center justify-between gap-x-4 rounded-full bg-gray-900 px-4 py-2 text-white transition duration-500 ease-in-out hover:scale-125 hover:bg-sky-900 focus-visible:scale-125 focus-visible:bg-sky-900"
        rel="noopener noreferrer"
        target="_blank"
      >
        <SvgsNext class="h-6 w-6" />
        Next portfolio
        <SvgsArrowTopRightOnSquare class="h-4 w-4" />
      </a>
      <a
        href="https://dsm23-solid-start-portfolio.netlify.app/"
        class="flex transform items-center justify-between gap-x-4 rounded-full bg-gray-900 px-4 py-2 text-white transition duration-500 ease-in-out hover:scale-125 hover:bg-sky-900 focus-visible:scale-125 focus-visible:bg-sky-900"
        rel="noopener noreferrer"
        target="_blank"
      >
        <SvgsSolid class="h-6 w-6" />
        Solid Start portfolio
        <SvgsArrowTopRightOnSquare class="h-4 w-4" />
      </a>
    </div>
  </Section>
</template>
