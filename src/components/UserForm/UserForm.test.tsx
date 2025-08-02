import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { vi } from "vitest";
import UserForm from "./UserForm";

// Mock the useUsers hook
const mockOnAddUser = vi.fn();

vi.mock("@/context/Users/hooks/useUsers", () => ({
  useUsers: () => ({
    onAddUser: mockOnAddUser,
  }),
}));

describe("UserForm", () => {
  beforeEach(() => {
    mockOnAddUser.mockClear();
  });

  test("it shows name and email inputs and a button", () => {
    // render the component
    render(<UserForm />);

    // manipulate the component or find an element in it, you can access the rendered HTML through the screen object
    // preferred way to find elements is by role
    const nameInput = screen.getByRole("textbox", { name: /enter name/i });
    const emailInput = screen.getByRole("textbox", { name: /enter email/i });
    const button = screen.getByRole("button", { name: /add user/i });

    // make sure the component is doing what we expect it to do
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("it does not submit with empty inputs", async () => {
    render(<UserForm />);

    const button = screen.getByRole("button");

    user.click(button);

    await waitFor(() => {
      expect(mockOnAddUser).not.toHaveBeenCalled();
    });
  });

  test("it calls onAddUser with the correct arguments", async () => {
    render(<UserForm />);

    // "name" can be:
    // the element’s associated <label> text
    // or an element’s aria-label or aria-labelledby
    // or visible text in special roles (like <button>Submit</button> → name: "Submit")
    const nameInput = screen.getByRole("textbox", { name: /enter name/i });
    const emailInput = screen.getByRole("textbox", { name: /enter email/i });
    const button = screen.getByRole("button", { name: /add user/i });

    // Simulate typing name
    await user.click(nameInput);
    await user.keyboard("John");

    // Simulate typing email
    await user.click(emailInput);
    await user.keyboard("john@example.com");

    user.click(button);

    await waitFor(() => {
      expect(mockOnAddUser).toHaveBeenCalled();
      expect(mockOnAddUser).toHaveBeenCalledWith({
        id: expect.any(String),
        name: "John",
        email: "john@example.com",
      });
    });
  });

  test("it resets the form after submit", async () => {
    render(<UserForm />);

    const nameInput = screen.getByRole("textbox", { name: /enter name/i });
    const emailInput = screen.getByRole("textbox", { name: /enter email/i });
    const button = screen.getByRole("button", { name: /add user/i });

    // Simulate typing name
    await user.click(nameInput);
    await user.keyboard("John");

    // Simulate typing email
    await user.click(emailInput);
    await user.keyboard("john@example.com");

    user.click(button);

    await waitFor(() => {
      expect(nameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
