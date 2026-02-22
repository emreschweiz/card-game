import { createSlice } from "@reduxjs/toolkit";

const GRID_SIZE = 5;
const PAIR_COUNT = 12;
const MISMATCH_PENALTY = 10;
const MATCH_REWARD = 50;

const SYMBOLS = [
  "😀",
  "😎",
  "🤖",
  "🐶",
  "🐱",
  "🦊",
  "🐼",
  "🐸",
  "🍎",
  "🍓",
  "⚽",
  "🚗"
];

const shuffle = (items) => {
  const copied = [...items];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[randomIndex]] = [copied[randomIndex], copied[i]];
  }
  return copied;
};

const createDeck = () => {
  const pairedCards = SYMBOLS.slice(0, PAIR_COUNT).flatMap((symbol, pairId) => [
    {
      id: `${pairId}-a`,
      pairId,
      value: symbol,
      isOpen: false,
      isMatched: false
    },
    {
      id: `${pairId}-b`,
      pairId,
      value: symbol,
      isOpen: false,
      isMatched: false
    }
  ]);

  // 5x5 grid tek sayı olduğu için 1 adet nötr kart kullanılır.
  const neutralCard = {
    id: "neutral",
    pairId: "neutral",
    value: "⭐",
    isOpen: true,
    isMatched: true
  };

  return shuffle([...pairedCards, neutralCard]).slice(0, GRID_SIZE * GRID_SIZE);
};

const isGameOver = (cards) => cards.every((card) => card.isMatched);

const initialState = {
  cards: createDeck(),
  openedIndices: [],
  score: 0,
  isChecking: false,
  gameOver: false
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    restartGame(state) {
      state.cards = createDeck();
      state.openedIndices = [];
      state.score = 0;
      state.isChecking = false;
      state.gameOver = false;
    },
    flipCard(state, action) {
      const index = action.payload;
      const card = state.cards[index];

      if (!card || state.isChecking || state.gameOver) {
        return;
      }

      if (card.isOpen || card.isMatched) {
        return;
      }

      if (state.openedIndices.length >= 2) {
        return;
      }

      card.isOpen = true;
      state.openedIndices.push(index);

      if (state.openedIndices.length === 2) {
        state.isChecking = true;
      }
    },
    resolveOpenedCards(state) {
      if (state.openedIndices.length !== 2) {
        state.isChecking = false;
        return;
      }

      const [firstIndex, secondIndex] = state.openedIndices;
      const firstCard = state.cards[firstIndex];
      const secondCard = state.cards[secondIndex];
      const isMatch = firstCard.pairId === secondCard.pairId;

      if (isMatch) {
        firstCard.isMatched = true;
        secondCard.isMatched = true;
        state.score += MATCH_REWARD;
      } else {
        firstCard.isOpen = false;
        secondCard.isOpen = false;
        state.score -= MISMATCH_PENALTY;
      }

      state.openedIndices = [];
      state.isChecking = false;
      state.gameOver = isGameOver(state.cards);
    }
  }
});

export const { flipCard, resolveOpenedCards, restartGame } = gameSlice.actions;

export const selectGame = (state) => state.game;

export const flipCardWithCheck = (index) => (dispatch, getState) => {
  dispatch(flipCard(index));

  const { openedIndices, isChecking } = getState().game;

  if (isChecking && openedIndices.length === 2) {
    setTimeout(() => {
      dispatch(resolveOpenedCards());
    }, 800);
  }
};

export default gameSlice.reducer;
