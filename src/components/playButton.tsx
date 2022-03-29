type playButtonProps = {
  playAgain: Function;
  setIsFirstRender: Function;
};

function PlayButton({ playAgain, setIsFirstRender }: playButtonProps & {}) {
  return (
    <div className="h-96vh bg-white">
      <div className="justify-center items-center h-screen flex">
        <button
          onClick={() => {
            setIsFirstRender(false);
            playAgain();
          }}
          className="text-4xl text-white bg-green-500 px-8 py-2 rounded-md"
        >
          Start playing
        </button>
      </div>
    </div>
  );
}

export { PlayButton };
