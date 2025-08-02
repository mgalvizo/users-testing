import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com" },
];

vi.mock("@/context/Users/hooks/useUsers", () => ({
  useUsers: () => ({
    users: mockUsers,
  }),
}));

describe("UserList", () => {
  test("renders a heading with level 2 and the text 'Users'", () => {
    render(<UserList />);

    const heading = screen.getByRole("heading", { level: 2, name: /users/i });

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  });

  test("renders one row per user in the table body", () => {
    render(<UserList />);

    // Query helper
    // Open the generated URL in the browser
    // Click over the elements to get a recommendation of how to query
    // If an element is hard to click over you can write inline styles like a thick border with display block to make it easier to click
    // screen.logTestingPlaygroundURL();

    // Find the tbody
    // We added a data-testid="users" in the JSX (NOT GREAT)
    const tbody = screen.getByTestId("users");
    // Find all the rows in the table
    const rows = within(tbody).getAllByRole("row");

    expect(rows).toHaveLength(mockUsers.length);
  });

  test("renders the name and email of each user in table cells", () => {
    render(<UserList />);

    // there are only td inside <tbody> in this case
    for (const user of mockUsers) {
      const { name, email } = user;

      const cellName = screen.getByRole("cell", { name });
      const cellEmail = screen.getByRole("cell", { name: email });

      expect(cellName).toBeInTheDocument();
      expect(cellEmail).toBeInTheDocument();
    }
  });

  afterAll(() => {
    vi.clearAllMocks();
  });
});
