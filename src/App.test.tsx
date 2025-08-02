import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  test("renders a form and a table", () => {
    render(<App />);

    const form = screen.getByRole("form", { name: /user form/i });
    const table = screen.getByRole("table");

    expect(form).toBeInTheDocument();
    expect(table).toBeInTheDocument();
  });

  test("receives a new user and shows it on a list", async () => {
    render(<App />);

    const nameInput = screen.getByRole("textbox", { name: /enter name/i });
    const emailInput = screen.getByRole("textbox", { name: /enter email/i });
    const button = screen.getByRole("button", { name: /add user/i });

    await user.click(nameInput);
    await user.keyboard("jane");
    await user.click(emailInput);
    await user.keyboard("jane@mail.com");

    // needs await so the user is added to the debug output
    await user.click(button);

    // screen.debug();

    const name = screen.getByRole("cell", { name: "jane" });
    const email = screen.getByRole("cell", { name: "jane@mail.com" });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
});
