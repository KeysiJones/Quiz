type Props = {
  score: number;
};

export default function Highscore({ score }: Props) {
  const latestHighScore = parseInt(localStorage.getItem("highscore") ?? "0");

  return (
    <div>
      <p className="text-xl text-blue-600">Highscore:&nbsp;{latestHighScore}</p>
    </div>
  );
}
