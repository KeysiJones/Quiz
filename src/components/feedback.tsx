type FeedbackProps = {
  correct: boolean;
};

function Feedback({ correct }: FeedbackProps) {
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

export { Feedback };
