import { useEffect, useState } from "react";

type questionButton = {
  score: number;
  setScore: Function;
  letter: string;
  option: string;
  jumper: Function;
  previousQuestion: number;
  correct: string;
  selectedOption: string | null;
  setSelectedOption: Function;
};

var _timeOutReference: NodeJS.Timeout = null;

function QuestionButton({
  score,
  setScore,
  letter,
  option,
  jumper,
  previousQuestion,
  correct,
  setSelectedOption,
  selectedOption,
}: questionButton) {
  const [bgColor, setBgColor] = useState("bg-blue-500");
  const [borderColor, setBorderColor] = useState("");
  const [disabled, setDisabled] = useState(false);
  let updatedScore = score;
  useEffect(() => {
    return () => {
      _timeOutReference = null;
      setSelectedOption(null);
    };
  }, []);
  useEffect(() => {
    if (_timeOutReference && selectedOption !== correct && correct === letter) {
      setBorderColor("border-green-500 border-4");
      setBgColor("bg-green-600");
    }
  }, [selectedOption, correct, letter]);
  return (
    <button
      onClick={() => {
        if (_timeOutReference === null) {
          setSelectedOption(letter);
          let color = "bg-red-500";
          setDisabled(true);
          if (correct === letter) {
            color = "bg-green-500";
            setScore(score + 10);
            updatedScore = score + 10;
          }
          setBgColor(color);
          _timeOutReference = setTimeout(() => {
            jumper(previousQuestion, updatedScore);
            setBgColor("bg-blue-500");
            setDisabled(false);
          }, 1000);
        }
      }}
      className={`flex rounded-3xl my-2 mx-4 px-4 py-3 text-center ${bgColor} text-white ${borderColor}`}
      disabled={disabled}
    >
      <label className="text-white">{letter})</label>
      <label className="mx-2 text-xl">{option}</label>
    </button>
  );
}

export { QuestionButton };
