import { useState } from "react";
import { QuestionButton } from "./questionButton";

type questionProps = {
  actualQuestion: {
    id: number;
    options: [{ letter: string; option: string; id: number }];
    question: string;
    correct: string;
  };
  jumper: Function;
  quantity: number;
  playAgain: Function;
};
function Question({
  actualQuestion,
  jumper,
  quantity,
  playAgain,
}: questionProps) {
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
        <p
          className={`m-4 text-4xl ${
            actualQuestion === undefined ? "text-red-500" : ""
          }`}
        >
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

export { Question };
