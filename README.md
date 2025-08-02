# Users Testing

## React Testing Library

- `@testing-library/react`
  - Uses ReactDOM to render a component for testing
- `@testing-library/user-event`
  - Helps simulate user input like typing and clicking
- `@testing-library/dom`
  - Helps find elements that are rendered by our components
- `jest`
  - Runs our tests, reports results
- `jsdom`
  - Simulates a browser when running in a Node environment

## Jest

Jest finds all files in the src folder that:

- end with `.spec.js | .spec.ts`
- end with `.test.js | .test.ts`
- are placed in a folder called `__test__`

## Test Writing Process

1. Pick one out component to test all by itself
2. Make a test file for the component if one does not exist
3. Decide what the important parts of the component are
4. Write a test to make sure each part works as expected
5. Run tests at the command line

## Queries

An **important** part of testing is finding the elements that our component has created.

- Need to test form submission? &rarr; You need to find a button to click!
- Need to test navigation? &rarr; You need to find a link to click!
- Need to make sure a header is visible? &rarr; You need to find a header!

## React Testing Library Query System

`getBy` returns an element or an error.

All search variants can be extended with the `All` word.

- `getByText()`: find the element by its `textContent` value
- `getByRole()`: by its `role` attribute value
- `getByLabelText()`: by its `label` attribute value
- `getByPlaceholderText()`: by its `placeholder` attribute value
- `getByAltText()`: by its `alt` attribute value
- `getByDisplayValue()`: by its `value` attribute, usually for `<input>` elements
- `getByTitle()`: by its `title` attribute value
- `getByTestId()`: by its `data-testid`

## Search Variants

Every time you are asserting that an element isn't there, use `queryBy`

`findBy` search variant is used for asynchronous elements which will be there eventually.

All search variants can be extended with the `All` word.

- `queryBy`
  - `queryByText`
  - `queryByRole`
  - `queryByLabelText`
  - `queryByPlaceholderText`
  - `queryByAltText`
  - `queryByDisplayValue`
- `findBy`
  - `findByText`
  - `findByRole`
  - `findByLabelText`
  - `findByPlaceholderText`
  - `findByAltText`
  - `findByDisplayValue`

## ARIA Role

Aria roles clarify the purpose of an HTML element.

Traditionally used by screen readers - softwares to help people understand the content on the screen.

Many HTML elements have an "implicit" or automatically assigned role.

Elements can be manually assigned a role (Avoid this), even trained engineers do this incorrectly.

- `heading` &rarr; `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- `list` &rarr; `ul`, `li`
- `button` &rarr; `button`
- `link` &rarr; `a`
- `textbox` &rarr; `input`, `type="text"`

## Matchers from Jest

- `expect(['a', 'b']).toHaveLength(2)` &rarr; makes sure the value is an array with a particular length
- `expect(5).toEqual(5)` &rarr; makes sure the value equals another value
- `expect(['a', 'b', 'c']).toContain('b')` &rarr; makes sure an array contains a value, or make sure a string contains another string
- `expect(fn).toThrow()` &rarr; makes sure a function throws an error when called
- `expect(mock).toHaveBeenCalled()` &rarr; makes sure a mock function has been called

## Matchers from React Testing Library

- `expect(element).toBeInTheDocument()` &rarr; makes sure element is present on the page
- `expect(element).toBeEnabled()` &rarr; makes sure an element (like an input) is not disabled
- `expect(element).toHaveClass()` &rarr; makes sure an element has a class name
- `expect(element).toHaveTextContent()` &rarr; makes sure an element has some particular text
- `expect(element).toHaveValue()` &rarr; makes sure an input, select, or textarea has a value

## User Functions

- `user.click(element)` &rarr; simulates clicking on the provided element
- `user.keyboard('asdfg')` &rarr; simulates typing `asdfg`
- `user.keyboard('{Enter}')` &rarr; simulates pressing the Enter key

## Mock Functions

In English "mock" can mean "not real".

Fake function that doesn't do anything.

Records whenever it gets called, and the arguments it was called with.

Used very often when we need to make sure a component calls a callback.

## Help with Query Functions

Memorizing all the query functions to find elements and roles is hard.

To get help with finding a particular element, use this helper function.

`screen.logTestingPlaygroundURL()`

Takes the HTML currently rendered by your component and creates a link to view that HTML in the "Testing Playground" tool

Testing Playground helps you write queries (functions to find elements)

## Query Function Fallbacks

Sometimes finding elements by role just doesn't work well

- Fallbacks:
  - `data-testid`
  - `container.querySelector`

**data-testid**

```tsx
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
  test("it renders one row per user", () => {
    render(<UserList />);

    // Find the tbody
    // We added a data-testid="users" in the JSX (NOT GREAT)
    const tbody = screen.getByTestId("users");
    // Find all the rows in the table
    const rows = within(tbody).getAllByRole("row");

    expect(rows).toHaveLength(3);
  });
});
```

**container.querySelector**

```tsx
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
  test("it renders one row per user", () => {
    // a container is automatically added in
    // <div> element
    const { container } = render(<UserList />);

    // Find all the rows in tbody
    const rows = container.querySelectorAll("tbody tr");

    expect(rows).toHaveLength(3);
  });
});
```
