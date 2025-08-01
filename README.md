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
