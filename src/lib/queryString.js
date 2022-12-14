const keyValueToString = ([key, value]) => {
  return `${key}=${value}`;
};

export function queryString(str) {
  const hasInvalidParam = Object.values(str).some(
    (item) => typeof item === "object" && !Array.isArray(item)
  );

  if (hasInvalidParam) throw new Error("Please check your params");

  return Object.entries(str).map(keyValueToString).join("&");
}

export function parse(string) {
  const arrayOfParams = string.split("&");
  const obj = Object.fromEntries(
    arrayOfParams.map((item) => {
      const [key, value] = item.split("=");

      if (value.includes(",")) {
        return [key, value.split(",")];
      }

      return [key, value];
    })
  );
  return obj;
}
