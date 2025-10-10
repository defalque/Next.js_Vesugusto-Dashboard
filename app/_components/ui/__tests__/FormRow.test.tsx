import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import FormRow from "../form/FormRow";

test("input type password flow if toggled", () => {
  render(
    <FormRow
      type="password"
      label="Password"
      placeholder="Inserisci password..."
    />,
  );

  const inputEl = screen.getByPlaceholderText(/password/i, { exact: false });
  expect(inputEl.getAttribute("type")).toBe("password");

  const toggle = screen.getByRole("button", { name: /mostra password/i });
  expect(toggle.getAttribute("aria-label")).toBe("Mostra password");

  fireEvent.click(toggle);

  expect(toggle.getAttribute("aria-label")).toBe("Nascondi password");
  expect(inputEl.getAttribute("type")).toBe("text");

  fireEvent.click(toggle);
  expect(inputEl.getAttribute("type")).toBe("password");
  expect(toggle.getAttribute("aria-label")).toBe("Mostra password");
});
