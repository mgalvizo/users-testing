import "vitest";
import type { ByRoleMatcher } from "@testing-library/dom";

interface CustomMatchers<R = unknown> {
  toContainRole: (role: ByRoleMatcher, quantity: number) => R;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any
  interface Matchers<T = any> extends CustomMatchers<T> {}
}
