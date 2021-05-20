import { render, screen } from "@testing-library/react";

import App from "../App";

test("renders App element", () => {
  render(<App />);
  const appElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
