const keyValueToString = ([key, value]) => {
  return `${key}=${value}`;
};

module.exports.queryString = (str) => {
  const hasInvalidParam = Object.values(str).some(
    (item) => typeof item === "object" && !Array.isArray(item)
  );

  if (hasInvalidParam) throw new Error("Please check your params");

  return Object.entries(str).map(keyValueToString).join("&");
};
