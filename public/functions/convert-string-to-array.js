exports.convertFieldStringToArray = (obj, prop) => {
  const result = { ...obj };

  if (obj.hasOwnProperty(prop)) {
    result[prop] = result[prop].split(",");
  }

  return result;
};
