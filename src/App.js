import { useState } from "react";
import "./App.css";

const questions = [
  {
    id: 1,
    question: "Who discovered America ?",
    options: [
      { letter: "A", option: "Christopher Columbus" },
      { letter: "B", option: "Chris Evans" },
      { letter: "C", option: "Ronaldinho Gaúcho" },
      { letter: "D", option: "Americo Vespucci" },
      { letter: "E", option: "Wolverine" },
    ],
    correct: "A",
  },
  {
    id: 2,
    question: "Who is the best fit for this position ?",
    options: [
      { letter: "A", option: "Moroni Moriancumer" },
      { letter: "B", option: "Mosias" },
      { letter: "C", option: "Keysi Jones" },
      { letter: "D", option: "Carlos Rodrigues" },
      { letter: "E", option: "Lucas Fernandes" },
    ],
    correct: "C",
  },
  {
    id: 3,
    question: "Who was the first software developer?",
    options: [
      { letter: "A", option: "Christopher Nolan" },
      { letter: "B", option: "Erick Wright" },
      { letter: "C", option: "Ada Lovelace" },
      { letter: "D", option: "Bruce Coder" },
      { letter: "E", option: "Brendan Eich" },
    ],
    correct: "C",
  },
  {
    id: 4,
    question: "Who was Beckham ? ?",
    options: [
      { letter: "A", option: "A singer" },
      { letter: "B", option: "A dancer" },
      { letter: "C", option: "A football player" },
      { letter: "D", option: "A reporter" },
      { letter: "E", option: "A programmer" },
    ],
    correct: "C",
  },
  {
    id: 5,
    question: "Who won 2014 world cup ?",
    options: [
      { letter: "A", option: "Brazil" },
      { letter: "B", option: "Russia" },
      { letter: "C", option: "Peru" },
      { letter: "D", option: "Germany" },
      { letter: "E", option: "Netherlands" },
    ],
    correct: "D",
  },
  {
    id: 6,
    question: "Who was Joseph Smith ?",
    options: [
      { letter: "A", option: "A singer" },
      { letter: "B", option: "A profet" },
      { letter: "C", option: "A designer" },
      { letter: "D", option: "A soccer player" },
      { letter: "E", option: "An athlete" },
    ],
    correct: "B",
  },
];

let answered = [];

function App() {
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true)

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
    isFirstRender ?
    <PlayButton setIsFirstRender={setIsFirstRender} playAgain={playAgain}/>
    :
    <div className="h-screen text-center bg-white flex flex-col justify-center mx-4">
      <Question
        actualQuestion={availableQuestions[0]}
        jumper={jumper}
        playAgain={playAgain}
        quantity={questions.length}
      />
    </div>
  );
}

function PlayButton({playAgain, setIsFirstRender}) {
  return (
    <div className="h-screen bg-white">
      <div className="justify-center items-center h-screen flex">
        <button onClick={() => {
          setIsFirstRender(false)
          playAgain()
          }} className="text-4xl text-white bg-green-500 px-8 py-2 rounded-md">
          Start playing
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
  const [disabled, setDisabled] = useState(false);
  return (
    <button
      onClick={() => {
        let color = "bg-red-500";
        setDisabled(true)
        if (correct === letter) {
          color = "bg-green-500";
          setScore(score + 10);
        }
        setBgColor(color);
        setTimeout(() => {
          jumper(previousQuestion);
          setBgColor("bg-blue-500");
          setDisabled(false)
        }, 1000);
      }}
      className={`flex rounded-3xl my-2 mx-4 px-4 py-3 text-center ${bgColor} text-white`}
      disabled={disabled}
    >
      <label className="text-white">{letter})</label>
      <label className="mx-2 text-xl">{option}</label>
    </button>
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
              actualQuestion ? "text-left text-xl" : "text-center text-2xl"
            } ml-8 text-blue-600`}
          >
            Score: {score}
          </p>
          <p className="text-right mr-8 text-xl text-blue-600">
            {actualQuestion ? (
              <p>{`${actualQuestion.id}/${quantity}`}</p>
            ) : (
              false
            )}
          </p>
        </div>
        <p className={`m-4 text-4xl ${actualQuestion === undefined ? 'text-red-500' : ''}`}>
          {actualQuestion ? actualQuestion.question : "Game Over"}
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
            className="bg-blue-500 text-white px-2 py-1 rounded-md"
            onClick={() => {
              setScore(0);
              playAgain();
            }}
          >
            Play again
          </button>
        </div>
      )}
    </>
  );
}

export default App;
