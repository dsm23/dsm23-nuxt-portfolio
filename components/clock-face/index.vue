<script setup lang="ts">
  const time = ref<Date>(new Date());

  onMounted(() => {
    const interval = setInterval(() => (time.value = new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const hours = computed(() => time.value.getHours());
  const minutes = computed(() => time.value.getMinutes());
  const seconds = computed(() => time.value.getSeconds());

  const transformHour = computed(
    () => `rotate(${30 * hours.value + minutes.value / 2})`,
  );
  const transformMinute = computed(
    () => `rotate(${6 * minutes.value + seconds.value / 10})`,
  );
  const transformSecond = computed(() => `rotate(${6 * seconds.value})`);

  const arr = Array.from<unknown, [boolean, number]>({ length: 60 }, (_, i) => [
    i % 5 === 0,
    i,
  ]);
</script>

<template>
  <svg viewBox="-50 -50 100 100" class="aspect-square h-[50vmin] w-[50vmin]">
    <circle class="fill-white stroke-[#333]" r="48" />

    <Marker
      v-for="([isMajor, radial], index) in arr"
      :key="index"
      :is-major="isMajor"
      :radial="radial"
    />

    <line
      id="hour"
      class="stroke-[#333]"
      y1="2"
      y2="-20"
      :transform="transformHour"
    />

    <line
      id="minute"
      class="stroke-[#666]"
      y1="4"
      y2="-30"
      :transform="transformMinute"
    />

    <g id="second" :transform="transformSecond">
      <line class="text-red-700" y1="10" y2="-38" stroke="currentColor" />
      <line
        class="text-red-700"
        y1="10"
        y2="2"
        stroke="currentColor"
        stroke-width="3"
      />
    </g>
  </svg>
</template>
