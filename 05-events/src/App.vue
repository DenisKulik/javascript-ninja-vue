<script setup lang="ts">
import { computed, watch, ref, useTemplateRef } from 'vue'
import { shuffleCards } from '@/utils'
import { symbols } from '@/data'
import MemoryCards from '@/components/MemoryCards.vue'

const cards = ref([]);
const moves = ref(0);
const totalPairs = symbols.length;
const matchedCards = ref(new Set<number>());
const openedCards = ref(new Set<number>());
const matches = computed(() => matchedCards.value.size / 2);
const isGameWon = computed(() => matches.value === totalPairs);
const hintDialog = useTemplateRef<HTMLDialogElement>('hintDialog');
const hintImage = ref('');

function resetGame() {
  openedCards.value.clear()
  matchedCards.value.clear();
  moves.value = 0;
  cards.value = shuffleCards([...symbols, ...symbols].map((symbol, index) => ({
    ...symbol,
    showedHint: 0
  })));
}

function openCard(index: number) {
  moves.value += 1;
  openedCards.value.add(index);
}

function getStatus(index: number) {
  if (openedCards.value.has(index)) {
    return "opened";
  }

  if (matchedCards.value.has(index)) {
    return "matched";
  }

  return "closed";
}

const showHint = (index: number, image: string) => {
  hintImage.value = image
  cards.value[index].showedHint += 1
  hintDialog.value.showModal()
}

const closeDialog = () => {
  hintDialog.value.close()
}

const CLOSE_TIMEOUT = 1000;
const hasTwoCardsOpened = computed(() => openedCards.value.size === 2);
watch(hasTwoCardsOpened, (areTwoCardsOpened) => {
  if (!areTwoCardsOpened) {
    return;
  }

  setTimeout(() => {
    openedCards.value.clear()
  }, CLOSE_TIMEOUT);

  const [firstIndex, secondIndex] = [...openedCards.value.values()];
  if (cards.value[firstIndex].name === cards.value[secondIndex].name) {
    matchedCards.value.add(firstIndex);
    matchedCards.value.add(secondIndex);
  }
});


resetGame();
</script>

<template>
  <div id="app">
    <h1>Memory Game</h1>

    <div class="game-info">
      <div>Moves: {{ moves }}</div>
      <div>Matches: {{ matches }} / {{ totalPairs }}</div>
    </div>

    <dialog ref="hintDialog" class="hint-dialog">
      <img :src="hintImage" />
      <button @click="closeDialog">Закрыть</button>
    </dialog>

    <div class="board">
      <MemoryCards
        v-for="(card, index) in cards"
        :key="index"
        :status="getStatus(index)"
        :disabled="hasTwoCardsOpened"
        :image="card.image"
        :showed-hint="card.showedHint"
        @on-hint="showHint(index, $event)"
        @click="openCard(index)"
      />
    </div>

    <button @click="resetGame">New Game</button>

    <div v-if="isGameWon" class="win-message">
      Congratulations! You won in {{ moves }} moves!
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Arial", sans-serif;
  background-color: #f4f7f9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

#app {
  width: 100%;
  max-width: 800px;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.game-info {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.game-info div {
  font-size: 1.2rem;
  font-weight: bold;
  color: #34495e;
}

.board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  margin: 0 auto;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

.win-message {
  margin-top: 20px;
  font-size: 1.5rem;
  color: #27ae60;
  font-weight: bold;
}

.hint-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}

@media (max-width: 600px) {
  .board {
    grid-template-columns: repeat(3, 1fr);
  }
  .card {
    height: 100px;
  }
}
</style>