import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { PlayButton } from "./playButton";

let container: HTMLDivElement & (Element | DocumentFragment);

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("PlayButton's text should be 'Start playing'", () => {
  act(() => {
    render(
      <PlayButton playAgain={undefined} setIsFirstRender={undefined} />,
      container
    );
  });
  expect(container.textContent).toBe("Start playing");
});
