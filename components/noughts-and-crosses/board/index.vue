<script setup lang="ts">
  type Squares = Array<null | "X" | "O">;

  const { squares } = defineProps({
    squares: {
      type: Array as PropType<Squares>,
      default: [],
    },
  });

  const emit = defineEmits<{
    (e: "click", index: number): void;
  }>();

  const indices = Array.from({ length: 9 }, (_, i) => i);
</script>

<template>
  <div class="grid grid-cols-3 gap-0">
    <NoughtsAndCrossesSquare
      v-for="index in indices"
      :key="`board-${index}`"
      @click="emit('click', index)"
      :aria-label="`game board, position: ${index % 3} ${Math.floor(
        index / 3,
      )}`"
    >
      {{ squares[index] }}
    </NoughtsAndCrossesSquare>
  </div>
</template>
