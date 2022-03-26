import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders play button at first render", () => {
  render(<App />);
  const startButton = screen.getByRole("button");

  expect(startButton).toBeInTheDocument();
  expect(startButton).toHaveTextContent("Start playing");
});
