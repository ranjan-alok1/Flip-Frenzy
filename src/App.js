import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Card from "./components/Card";

const allCards = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(11);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);

  const shuffleCards = useCallback(() => {
    const shuffledCards = [...allCards, ...allCards]
      .sort(() => 0.5 - Math.random())
      .map((card) => {
        return { ...card, id: Math.random() };
      });
    setCards(shuffledCards);
    setFirstChoice(null);
    setSecondChoice(null);
    setTurn(11);
  }, []);

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  useEffect(() => {
    shuffleCards();
  }, [shuffleCards]);

  const resetTurn = useCallback(() => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurn((prevTurn) => prevTurn - 1);
  }, []);

  useEffect(() => {
    if (firstChoice && secondChoice) {
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === firstChoice.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice, resetTurn]);

  useEffect(() => {
    if (turn !== 11) {
      const matchedCards = cards.filter((card) => card.matched);
      if (matchedCards.length === cards.length) {
        alert("You Win!");
        setTimeout(() => {
          shuffleCards();
        }, 500);
      } else if (turn === 0) {
        alert("You Lose!");
        setTimeout(() => {
          shuffleCards();
        }, 500);
      }
    }
  }, [turn, cards, shuffleCards]);

  return (
    <div className="App">
      <h1>Flip Frenzy</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === firstChoice || card === secondChoice || card.matched
            }
          />
        ))}
      </div>
      <div className="turn">Turns Left: {turn}</div>
    </div>
  );
}

export default App;
