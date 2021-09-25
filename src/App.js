import { useState } from "react";
import "./App.css";

const questions = [
  {
    id: 1,
    question: "Quem descobriu a américa ?",
    options: [
      { letter: "A", option: "Cristóvão Colombo" },
      { letter: "B", option: "Chris Evans" },
      { letter: "C", option: "O Ronaldinho Gaúcho" },
      { letter: "D", option: "El Guapo" },
      { letter: "E", option: "O mutante" },
    ],
    correct: "A",
  },
  {
    id: 2,
    question: "Qual é o nome do irmão de Jarede ?",
    options: [
      { letter: "A", option: "Moroni Moriancumer" },
      { letter: "B", option: "Mosias" },
      { letter: "C", option: "Kaká" },
      { letter: "D", option: "Mórmon" },
      { letter: "E", option: "Mahonri Moriâncumer" },
    ],
    correct: "E",
  },
  {
    id: 3,
    question: "Quem foi o Maicão ?",
    options: [
      { letter: "A", option: "Um personagem de todo mundo odeia o Chris" },
      { letter: "B", option: "Um dançarino" },
      { letter: "C", option: "Um Jogador de futebol" },
      { letter: "D", option: "Um guitarrista" },
      { letter: "E", option: "Un homem famoso" },
    ],
    correct: "A",
  },
  {
    id: 4,
    question: "Quem foi Pablo Escobar ?",
    options: [
      { letter: "A", option: "Um cantor" },
      { letter: "B", option: "Um dançarino" },
      { letter: "C", option: "Um Jogador de futebol" },
      { letter: "D", option: "Um domador de cães" },
      { letter: "E", option: "Um Narcotraficante" },
    ],
    correct: "E",
  },
  {
    id: 5,
    question: "Quem ganhou a copa de 2014 ?",
    options: [
      { letter: "A", option: "Brasil" },
      { letter: "B", option: "Russia" },
      { letter: "C", option: "Peru" },
      { letter: "D", option: "Alemanha" },
      { letter: "E", option: "Holanda" },
    ],
    correct: "D",
  },
  {
    id: 6,
    question: "Quem foi Joseph Smith ?",
    options: [
      { letter: "A", option: "Um cantor" },
      { letter: "B", option: "Um profeta" },
      { letter: "C", option: "Um Jogador de futebol" },
      { letter: "D", option: "Um jornalista" },
      { letter: "E", option: "Um Pianista" },
    ],
    correct: "B",
  },
];

let answered = [];

function App() {
  const [availableQuestions, setAvailableQuestions] = useState(questions);

  const jumper = (previousQuestion) => {
    answered.push(previousQuestion);

    setAvailableQuestions(
      availableQuestions.filter((a) => !answered.some((ans) => ans === a.id))
    );
  };

  const playAgain = () => {
    setAvailableQuestions(questions);
    answered = [];
  };

  return (
    <div className="h-screen text-center bg-white flex flex-col justify-center my-2">
      <Question
        actualQuestion={availableQuestions[0]}
        jumper={jumper}
        playAgain={playAgain}
        quantity={questions.length}
      />
    </div>
  );
}

function PlayButton() {
  return (
    <div className="h-screen bg-white">
      <div className="justify-center items-center h-screen text-center flex">
        <button className="text-5xl text-white text-center bg-green-500 px-4 py-2 rounded-md">
          Jogar
        </button>
      </div>
    </div>
  );
}

function QuestionButton({
  score,
  setScore,
  letter,
  option,
  jumper,
  previousQuestion,
  correct,
}) {
  const [bgColor, setBgColor] = useState("bg-blue-500");
  return (
    <div
      onClick={() => {
        let color = "bg-red-500";
        if (correct === letter) {
          color = "bg-green-500";
          setScore(score + 10);
        }
        setBgColor(color);
        setTimeout(() => {
          jumper(previousQuestion);
          setBgColor("bg-blue-500");
        }, 1000);
      }}
      className={`flex rounded-3xl my-2 mx-4 px-4 py-4 text-center ${bgColor} text-white`}
    >
      <label className="text-white">{letter})</label>
      <label className="mx-2 text-xl">{option}</label>
    </div>
  );
}

function Feedback({ correct }) {
  return (
    <div className="h-screen py-72">
      {correct ? (
        <p className="text-5xl text-green-500">Resposta certa :)</p>
      ) : (
        <p className="text-5xl text-red-500">Resposta errada :( </p>
      )}
    </div>
  );
}

function Question({ actualQuestion, jumper, quantity, playAgain }) {
  const [score, setScore] = useState(0);

  return (
    <>
      <div className="mb-8">
        <div
          className={`flex ${
            actualQuestion ? "justify-between" : "justify-center"
          } my-4`}
        >
          <p
            className={`${
              actualQuestion ? "text-left" : "text-center"
            } ml-8 text-md text-blue-600`}
          >
            Pontuação: {score}
          </p>
          <p className="text-right mr-8 text-md text-blue-600">
            {actualQuestion ? (
              <p>{`${actualQuestion.id}/${quantity}`}</p>
            ) : (
              false
            )}
          </p>
        </div>
        <p className="mx-4 text-4xl">
          {actualQuestion ? actualQuestion.question : "Fim do jogo"}
        </p>
      </div>
      {actualQuestion ? (
        actualQuestion.options.map((option) => {
          return (
            <QuestionButton
              key={option.id}
              previousQuestion={actualQuestion.id}
              jumper={jumper}
              letter={option.letter}
              option={option.option}
              correct={actualQuestion.correct}
              quantity={quantity}
              score={score}
              setScore={setScore}
            />
          );
        })
      ) : (
        <div>
          <button
            className="bg-blue-500 text-white p-4 rounded-3xl"
            onClick={() => {
              setScore(0);
              playAgain();
            }}
          >
            Tentar novamente
          </button>
        </div>
      )}
    </>
  );
}

export default App;
