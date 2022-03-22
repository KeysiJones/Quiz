import { useState } from "react";

type questionButton = {
  score: number;
  setScore: Function;
  letter: string;
  option: string;
  jumper: Function;
  previousQuestion: number;
  correct: string;
};
function QuestionButton({
  score,
  setScore,
  letter,
  option,
  jumper,
  previousQuestion,
  correct,
}: questionButton) {
  const [bgColor, setBgColor] = useState("bg-blue-500");
  const [disabled, setDisabled] = useState(false);
  return (
    <button
      onClick={() => {
        let color = "bg-red-500";
        setDisabled(true);
        if (correct === letter) {
          color = "bg-green-500";
          setScore(score + 10);
        }
        setBgColor(color);
        setTimeout(() => {
          jumper(previousQuestion);
          setBgColor("bg-blue-500");
          setDisabled(false);
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

export { QuestionButton };
