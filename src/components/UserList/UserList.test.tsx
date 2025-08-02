import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

vi.mock("@/context/Users/hooks/useUsers", () => ({
  useUsers: () => ({
    users: [
      { id: "1", name: "John Doe", email: "john@example.com" },
      { id: "2", name: "Jane Smith", email: "jane@example.com" },
      { id: "3", name: "Bob Johnson", email: "bob@example.com" },
    ],
  }),
}));

describe("UserList", () => {
  test("it renders a heading as an h2 element", () => {
    render(<UserList />);

    const heading = screen.getByRole("heading", { level: 2, name: /users/i });

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  });

  test("it renders one row per user", () => {
    render(<UserList />);

    // Query helper
    // Open the generated URL in the browser
    // Click over the elements to get a recommendation of how to query
    // If an element is hard to click over you can write inline styles like a thick border with display block to make it easier to click
    screen.logTestingPlaygroundURL();

    // Find the tbody
    // We added a data-testid="users" in the JSX (NOT GREAT)
    const tbody = screen.getByTestId("users");
    // Find all the rows in the table
    const rows = within(tbody).getAllByRole("row");

    expect(rows).toHaveLength(3);
  });

  test("it renders the name and the email of each user", () => {});

  afterAll(() => {
    vi.clearAllMocks();
  });
});
