import { useDispatch, useSelector } from "react-redux";
import { flipCardWithCheck, restartGame, selectGame } from "./features/gameSlice";

function App() {
  const dispatch = useDispatch();
  const { cards, score, gameOver } = useSelector(selectGame);

  return (
    <main className="container">
      <header className="topBar">
        <h1>Hafiza Oyunu</h1>
        <p className="score">Puan: {score}</p>
      </header>

      <section className="board" aria-label="Kart tahtasi">
        {cards.map((card, index) => {
          const opened = card.isOpen || card.isMatched;
          return (
            <button
              key={card.id}
              className={`card ${opened ? "open" : ""} ${card.isMatched ? "matched" : ""}`}
              onClick={() => dispatch(flipCardWithCheck(index))}
              disabled={opened}
              aria-label={opened ? `Kart ${card.value}` : "Kapali kart"}
            >
              {opened ? card.value : "?"}
            </button>
          );
        })}
      </section>

      {gameOver && (
        <button className="restartButton" onClick={() => dispatch(restartGame())}>
          Yeniden Oyna
        </button>
      )}
    </main>
  );
}

export default App;
