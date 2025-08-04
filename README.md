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
  - `data-testid` **(preferred)**
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

## beforeEach

`beforeEach` is discouraged by React Testing Library.

## Partial Role List

```tsx
const Roles = () => {
  return (
    <div>
      <a href="/">Link</a>
      <button>Button</button>
      <footer>Content Info</footer>
      <h1>Heading</h1>
      <header>Banner</header>
      <img alt="description" /> Img
      <input type="checkbox" /> Checkbox
      <input type="number" /> Spinbutton
      <input type="radio" /> Radio
      <input type="text" /> Textbox
      <li>ListItem</li>
      <ul>List</ul>
    </div>
  );
};

export default Roles;
```

```tsx
import { render, screen } from "@testing-library/react";
import Roles from "./Roles";

describe("Roles", () => {
  test("can find elements by role", () => {
    render(<Roles />);

    const roles = [
      "link",
      "button",
      "contentinfo",
      "heading",
      "banner",
      "img",
      "checkbox",
      "spinbutton",
      "radio",
      "textbox",
      "listitem",
      "list",
    ];

    for (const role of roles) {
      const el = screen.getByRole(role);

      expect(el).toBeInTheDocument();
    }
  });
});
```

## Finding by Accessible Name

Attempting to select with `screen.getByRole` will cause an error since we have two buttons.

```tsx
const AccessibleName = () => {
  return (
    <div>
      <button>Submit</button>
      <button>Cancel</button>
    </div>
  );
};

export default AccessibleName;
```

```tsx
import { render, screen } from "@testing-library/react";
import AccessibleName from "./AccessibleName";

describe("Accessible Name", () => {
  test("can select by accessible name", () => {
    render(<AccessibleName />);

    const submit = screen.getByRole("button", { name: /submit/i });
    const cancel = screen.getByRole("button", { name: /cancel/i });
  });
});
```

## Linking Inputs to Labels

```tsx
const Inputs = () => {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" />
      <label htmlFor="search">Search</label>
      <input id="search" />
    </div>
  );
};

export default Inputs;
```

```tsx
import { render, screen } from "@testing-library/react";
import Inputs from "./Inputs";

describe("Inputs", () => {
  test("shows an email and search input", () => {
    render(<Inputs />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const searchInput = screen.getByRole("textbox", { name: /search/i });

    expect(emailInput).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });
});
```

## Directly Assigning an Accessible Name

```tsx
const IconButtons = () => {
  return (
    <div>
      <button aria-label="sign in">
        <svg />
      </button>
      <button aria-label="sign out">
        <svg />
      </button>
    </div>
  );
};

export default IconButtons;
```

```tsx
import { render, screen } from "@testing-library/react";
import IconButtons from "./IconButtons";

describe("IconButtons", () => {
  test("find elements based on label", () => {
    render(<IconButtons />);

    const signinButton = screen.getByRole("button", { name: /sign in/i });
    const signoutButton = screen.getByRole("button", { name: /sign out/i });

    expect(signinButton).toBeInTheDocument();
    expect(signoutButton).toBeInTheDocument();
  });
});
```

## Deeper into Query Functions

- Start of Function Name
  - getBy
  - getAllBy
  - queryBy
  - queryAllBy
  - findBy
  - findAllBy
- These names indicate the following:
  1. Whether the function will return an element or an array of elements
  2. What happens if the function finds 0, 1 or more than 1 of the targeted elements
  3. Whether the function runs instantly (synchronously) or looks for an element over the span of time (asynchronously)
- When to use each:
  - Prove an element exists `getBy`, `getAllBy`
  - Prove an element does not exist `queryBy`, `queryAllBy`
  - Make sure an element eventually exists `findBy`, `findAllBy`

## getBy, queryBy, findBy

```tsx
const ColorList = () => {
  return (
    <ul>
      <li>Red</li>
      <li>Green</li>
      <li>Blue</li>
    </ul>
  );
};

export default ColorList;
```

```tsx
import { render, screen } from "@testing-library/react";
import ColorList from "./ColorList";

describe("ColorList", () => {
  test("getBy, queryBy, findBy finding 0 elements", async () => {
    render(<ColorList />);

    // There is no textbox in the component
    // getBy throws an error if 0 or more than 1 elements are found
    // For this test we pass a function and inside we call the query
    expect(() => screen.getByRole("textbox")).toThrow();
    // queryBy returns null if 0 elements are found
    expect(screen.queryByRole("textbox")).toEqual(null);
    // findBy watches the output of your component over a span of 1 second
    // every 50 milliseconds it's going to try to find some element
    // if it doesn't find the element within the span of 1 second it throws an error
    // it returns a promise that gets rejected
    await expect(screen.findByRole("textbox")).rejects.toThrow();
  });

  test("getBy, queryBy, findBy finding 1 element", async () => {
    render(<ColorList />);

    // only 1 ul element in component
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryByRole("list")).toBeInTheDocument();
    // Good for simple case
    expect(await screen.findByRole("list")).toBeInTheDocument();
    // In case you want to chain .not, .toEqual, .toHaveTextContent, etc
    await expect(screen.findByRole("list")).resolves.toBeInTheDocument();
  });

  test("getBy, queryBy, findBy finding > 1 elements", async () => {
    render(<ColorList />);

    // All single queries throw error if more than 1 element is found
    expect(() => screen.getByRole("listitem")).toThrow();
    expect(() => screen.queryByRole("listitem")).toThrow();
    await expect(screen.findByRole("listitem")).rejects.toThrow();
  });

  test("getAllBy, queryAllBy, findAllBy", async () => {
    render(<ColorList />);

    expect(screen.getAllByRole("listitem")).toHaveLength(3); // if 0 matches throws an error
    expect(screen.queryAllByRole("listitem")).toHaveLength(3); // if 0 matches will return an empty array []
    expect(await screen.findAllByRole("listitem")).toHaveLength(3); // if 0 matches throws an error
    // or
    await expect(screen.findAllByRole("listitem")).resolves.toHaveLength(3);
  });

  test("favor using getBy to prove an element exist", () => {
    render(<ColorList />);

    const list = screen.getByRole("list");

    expect(list).toBeInTheDocument();
  });

  test("favor using queryBy to prove an element does not exist", () => {
    render(<ColorList />);

    // There is no input type text
    const textbox = screen.queryByRole("textbox");

    expect(textbox).not.toBeInTheDocument();
  });
});
```

## Async Queries

```tsx
import { useState, useEffect } from "react";

const fakeFetchColors = () => {
  return Promise.resolve(["red", "green", "blue"]);
};

const LoadableColorList = () => {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const fetchColors = async () => {
      const fetchedColors = await fakeFetchColors();

      setColors(fetchedColors);
    };

    fetchColors();
  }, []);

  const renderedColors = colors.map((color, index) => {
    return <li key={index}>{color}</li>;
  });

  return <ul>{renderedColors}</ul>;
};

export default LoadableColorList;
```

```tsx
import { screen, render } from "@testing-library/react";
import LoadableColorList from "./LoadableColorList";

describe("LoadableColorList", () => {
  test("favor findBy or findAllBy when data fetching", async () => {
    render(<LoadableColorList />);

    const listitems = await screen.findAllByRole("listitem");

    expect(listitems).toHaveLength(3);
  });
});
```

## Query Criteria

Query functions have common endings. The different name endings indicate how the query for an element will be performed.

**Always** prefer using query function ending with `ByRole`. Only use others if `ByRole` is not an option.

- `ByRole` finds elements based on their **implicit** or **explicit** ARIA role
- `ByLabelText` find form elements based upon the text their paired labels contain
- `ByPlaceholderText` find form elements based upon their placeholder text
- `ByText` find elements upon the text they contain
- `ByDisplayValue` find elements based upon their current value
- `ByAltText` find elements upon their `alt` attribute
- `ByTitle` find elements based upon their `title` attribute
- `ByTestId` find elements based upon their `data-testid` attribute

```tsx
import { useState } from "react";

const DataForm = () => {
  const [email, setEmail] = useState<string>("someone@mail.com");

  return (
    <form>
      <h3>Enter Data</h3>
      <div data-testid="image wrapper">
        <img src="data.jpg" alt="data" />
      </div>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="color">Color</label>
      <input type="text" name="color" id="color" placeholder="Red" />
      <button type="submit" title="Click when ready to submit">
        Submit
      </button>
    </form>
  );
};

export default DataForm;
```

```tsx
import { render, screen } from "@testing-library/react";
import DataForm from "./DataForm";

describe("DataForm", () => {
  test("selecting different elements", () => {
    render(<DataForm />);

    const elements: HTMLElement[] = [
      screen.getByRole("button"), // often used
      screen.getByLabelText("Email"),
      screen.getByPlaceholderText("Red"),
      screen.getByText(/enter data/i), // often used
      screen.getByDisplayValue("someone@mail.com"),
      screen.getByAltText("data"),
      screen.getByTitle("Click when ready to submit"),
      screen.getByTestId("image wrapper"), // often used
    ];

    for (const element of elements) {
      expect(element).toBeInTheDocument();
    }
  });
});
```

## Matchers

Matchers make sure that a value is what we expect it to be.

```tsx
const DataForm = () => {
  return (
    <div>
      <button type="button">Go Back</button>
      <form aria-label="form">
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </form>
    </div>
  );
};

export default DataForm;
```

```tsx
import { render, screen, within } from "@testing-library/react";
import type { ByRoleMatcher } from "@testing-library/react";
import DataForm from "./DataForm";

// Custom matcher
const toContainRole = (
  container: HTMLElement,
  role: ByRoleMatcher,
  quantity: number = 1
): CustomMatcherResult => {
  const elements = within(container).queryAllByRole(role);

  if (elements.length === quantity) {
    return {
      pass: true,
      message: () => `Found ${quantity} ${role} elements`,
    };
  }

  return {
    pass: false,
    message: () =>
      `Expected to find ${quantity} ${role} elements, found ${elements.length} instead`,
  };
};

// connect custom matcher to "expect" function
expect.extend({ toContainRole });

describe("DataForm", () => {
  test("the form displays two buttons", () => {
    render(<DataForm />);

    // const form = screen.getByRole("form");
    // // buttons inside a form
    // const buttons = within(form).getAllByRole("button");

    // expect(buttons).toHaveLength(2);

    // Rewrite the test to use custom matcher
    const form = screen.getByRole("form");

    expect(form).toContainRole("button", 2);
  });
});
```
