import React, { useEffect } from "react";

type Props = {
  score: number;
};

export default function Highscore({ score }: Props) {
  const latestHighScore = parseInt(localStorage.getItem("highscore") ?? "0");

  const highestScore = latestHighScore > score ? latestHighScore : score;

  useEffect(() => {
    if (score > latestHighScore)
      localStorage.setItem("highscore", score.toString());
  }, [score, latestHighScore]);

  return (
    <div>
      <p
        className={`text-xl ${
          latestHighScore > score ? "text-blue-600" : "text-green-600"
        }`}
      >
        Highscore:&nbsp;{highestScore}
      </p>
    </div>
  );
}
