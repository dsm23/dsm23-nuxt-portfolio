<script setup lang="ts">
  import hljs from "highlight.js/lib/core";
  import javascript from "highlight.js/lib/languages/javascript";

  import "highlight.js/styles/github-dark-dimmed.min.css";

  hljs.registerLanguage("javascript", javascript);

  const listItems = Array.from({ length: 100 }, (_, i) => {
    const num = i + 1;

    switch (true) {
      case num % 3 === 0 && num % 5 === 0: {
        return "FizzBuzz";
      }
      case num % 5 === 0: {
        return "Buzz";
      }
      case num % 3 === 0: {
        return "Fizz";
      }
      default:
        return num;
    }
  });
</script>

<template>
  <Main class="w-full px-6 py-8">
    <GoBack class="mb-4" href="/#projects" />

    <h1 class="text-4xl uppercase tracking-widest text-sky-600">FizzBuzz</h1>

    <pre
      class="hljs my-4 whitespace-pre-wrap break-normal py-3 font-mono"
      v-html="
        hljs.highlight(
          `
            switch (true) {
              case num % 3 === 0 && num % 5 === 0: {
                return 'FizzBuzz';
              }
              case num % 5 === 0: {
                return 'Buzz';
              }
              case num % 3 === 0: {
                return 'Fizz';
              }
              default:
                return num;
            }
          `,
          {
            language: 'javascript',
          },
        ).value
      "
    />

    <ul role="list" class="space-y-3">
      <li
        v-for="num in listItems"
        :key="`fizzbuzz-${num}`"
        class="elevation overflow-hidden rounded-md bg-white px-6 py-4 text-center text-gray-900"
      >
        {{ num }}
      </li>
    </ul>
  </Main>
</template>
