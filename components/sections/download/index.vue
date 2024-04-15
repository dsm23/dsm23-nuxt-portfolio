<script setup lang="ts">
  const fetchPdf = async () => {
    const response = await fetch("/api/create-pdf");

    return await response.blob();
  };
  const { execute, status } = await useAsyncData("pdf", fetchPdf, {
    immediate: false,
    transform(response) {
      if (response instanceof Blob) {
        const url = window.URL.createObjectURL(response as Blob);

        const link = document.createElement("a");
        link.download = "DavidMurdochCV.pdf";
        link.href = url;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      }
    },
  });
</script>

<template>
  <Section class="print:hidden">
    <h2 class="text-5xl">Download</h2>

    <button
      class="mt-8 flex items-center gap-x-2 rounded-md border border-transparent bg-sky-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      @click="() => execute()"
      :disabled="status === 'pending'"
    >
      <SvgsArrowDownTray class="h-5 w-5" />
      Download this page as .pdf

      <Transition
        class="grid"
        enter-active-class="transition-[grid-template-columns] motion-reduce:transition-none duration-150"
        enter-from-class="grid-cols-[0fr]"
        enter-to-class="grid-cols-[1fr]"
        leave-active-class="transition-[grid-template-columns] motion-reduce:transition-none duration-150"
        leave-from-class="grid-cols-[1fr]"
        leave-to-class="grid-cols-[0fr]"
      >
        <div v-if="status === 'pending'">
          <div class="overflow-hidden">
            <SvgsThreeDots class="h-5 w-5" />
          </div>
        </div>
      </Transition>
    </button>
    <pre class="mt-4 whitespace-pre-wrap break-normal font-mono">
        gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen
        -dNOPAUSE -dQUIET -dBATCH
        -sOutputFile=DavidMurdochCV-postGhostscript.pdf DavidMurdochCV.pdf
      </pre
    >
  </Section>
</template>
