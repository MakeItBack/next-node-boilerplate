import { describe, expect, jest, it, test } from "@jest/globals";

describe("SERVER TESTS: A simple test group that always passes", () => {
  test("should return true", () => {
    const result = true;
    expect(result).toBe(true);
  });

  test("should also return true", () => {
    const result = true;
    expect(result).toEqual(true);
  });

  it("should return true too", () => {
    const result = true;
    expect(result).toBeTruthy();
  });
  it("should return not false (true) too", () => {
    const result = true;
    expect(result).not.toBeFalsy();
  });
});
