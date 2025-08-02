import { render, screen } from "@testing-library/react";
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
    // a container is automatically added in
    // <div> element
    const { container } = render(<UserList />);

    // Query helper
    // Open the generated URL in the browser
    // Click over the elements to get a recommendation of how to query
    // If an element is hard to click over you can write inline styles like a thick border with display block to make it easier to click
    screen.logTestingPlaygroundURL();

    // Find all the rows in tbody
    const rows = container.querySelectorAll("tbody tr");

    expect(rows).toHaveLength(3);
  });

  test("it renders the name and the email of each user", () => {});

  afterAll(() => {
    vi.clearAllMocks();
  });
});
