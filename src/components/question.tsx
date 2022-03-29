import React, { useState } from "react";
import Highscore from "./highscore";
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
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <main className="flex flex-col h-96vh justify-between sm:justify-evenly mb-12">
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
          {actualQuestion && <Highscore score={score} />}
          <p className="text-right mr-8 text-xl text-blue-600">
            {actualQuestion ? (
              <React.Fragment>{`${actualQuestion.id}/${quantity}`}</React.Fragment>
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
      <div className="flex flex-col">
      {actualQuestion ? (
        actualQuestion.options.map((option, index) => {
          return (
            <QuestionButton
              key={actualQuestion.id + "-" + index}
              previousQuestion={actualQuestion.id}
              jumper={jumper}
              letter={option.letter}
              option={option.option}
              correct={actualQuestion.correct}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
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
      </div>
    </main>
  );
}

export { Question };
