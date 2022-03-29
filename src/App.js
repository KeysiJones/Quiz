import { useState } from "react";
import { Question, PlayButton } from "./components";
import "./App.css";
import { questions } from "./mocks/questions";

let answered = [];

function App() {
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

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

  return isFirstRender ? (
    <PlayButton setIsFirstRender={setIsFirstRender} playAgain={playAgain} />
  ) : (
    <div className="mt-3 text-center bg-white flex flex-col justify-center max-w-screen-lg mx-auto">
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
