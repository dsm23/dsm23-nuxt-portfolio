<script setup lang="ts">
  type Squares = Array<null | "X" | "O">;

  function calculateWinner(squares: Squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  let history = ref<{ squares: Squares }[]>([
    {
      squares: Array(9).fill(null),
    },
  ]);
  let stepNumber = ref(0);
  const xIsNext = ref(true);

  const current = computed<{ squares: Squares }>(
    () => history.value[stepNumber.value],
  );
  const winner = computed(() => calculateWinner(current.value?.squares ?? []));

  const handleClick = (i: number) => {
    const squares = current.value?.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext.value ? "X" : "O";

    history.value.push({
      squares,
    });

    stepNumber.value = history.value.length - 1;
    xIsNext.value = !xIsNext.value;
  };

  const jumpTo = (step: number) => {
    stepNumber.value = step;
    xIsNext.value = step % 2 === 0;
  };

  let status = computed(() => {
    if (winner.value) {
      return "Winner: " + winner.value;
    } else {
      return "Next player: " + (xIsNext.value ? "X" : "O");
    }
  });
</script>

<template>
  <div class="w-full">
    <NoughtsAndCrossesBoard
      :squares="current?.squares"
      @click="(i: number) => handleClick(i)"
    />
  </div>
  <div>
    <div>{{ status }}</div>
    <ol>
      <li v-for="(_, move) in history" :key="`game-${move}`">
        <button
          @click="
            () => {
              jumpTo(move);
            }
          "
        >
          {{ move ? "Go to move #" + move : "Go to game start" }}
        </button>
      </li>
    </ol>
  </div>
</template>
