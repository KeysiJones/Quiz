import { useState } from "react";
import { Question, PlayButton } from "./components";
import "./App.css";
import { questions } from "./mocks/questions";

let answeredQuestions = [];

function App() {
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const latestHighScore = parseInt(localStorage.getItem("highscore") ?? "0");

  const jumper = (previousQuestion, lastScore) => {
    answeredQuestions.push(previousQuestion);

    let remainingQuestions = availableQuestions.filter(
      (availableQuestion) =>
        !answeredQuestions.some(
          (answeredQuestion) => answeredQuestion === availableQuestion.id
        )
    );

    setAvailableQuestions(remainingQuestions);

    const GameIsOver = remainingQuestions.length === 0;

    if (GameIsOver & (lastScore > latestHighScore))
      localStorage.setItem("highscore", lastScore.toString());
  };

  const playAgain = () => {
    setAvailableQuestions(questions);
    answeredQuestions = [];
  };

  return isFirstRender ? (
    <PlayButton setIsFirstRender={setIsFirstRender} playAgain={playAgain} />
  ) : (
    <div className="mt-3 h-96vh text-center bg-white flex flex-col justify-center max-w-screen-lg mx-auto">
      <Question
        actualQuestion={availableQuestions[0]}
        jumper={jumper}
        playAgain={playAgain}
        quantity={questions.length}
      />
    </div>
  );
}

export default App;
