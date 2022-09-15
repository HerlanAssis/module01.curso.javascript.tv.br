import { queryString, parse } from "./queryString";

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

describe("Querystring to Object", () => {
  it("should convert a querystring to object", () => {
    const qs = "name=Herlan&profession=developer";

    const result = parse(qs);
    const expected = {
      name: "Herlan",
      profession: "developer",
    };

    expect(result).toEqual(expected);
  });

  it("should convert a querystring of a single key-value object", () => {
    const qs = "name=Herlan";

    const expected = {
      name: "Herlan",
    };
    const result = parse(qs);

    expect(result).toEqual(expected);
  });

  it("should conver a querystring to an objeto take care of comma separated values", () => {
    const qs = "name=herlan&profession=developer&abilities=React,Django";

    const expected = {
      name: "herlan",
      profession: "developer",
      abilities: ["React", "Django"],
    };
    const result = parse(qs);

    expect(result).toEqual(expected);
  });
});
