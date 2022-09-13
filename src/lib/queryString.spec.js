const { queryString } = require("./queryString");

describe("Object to query string", () => {
  it("should create a valid query string when an object is provided", () => {
    const obj = {
      name: "herlan",
      profession: "developer",
    };

    const result = "name=herlan&profession=developer";

    expect(queryString(obj)).toBe(result);
  });

  it("should create a valid query string even when an array is passed as value", () => {
    const obj = {
      name: "herlan",
      profession: "developer",
      abilities: ["React", "Django"],
    };

    const result = "name=herlan&profession=developer&abilities=React,Django";

    expect(queryString(obj)).toBe(result);
  });

  it("should throw an error when object is passed as value", () => {
    const obj = {
      name: "herlan",
      profession: "developer",
      abilities: {
        first: "React",
        second: "Django",
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});
