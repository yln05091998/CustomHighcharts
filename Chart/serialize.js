export const serialize = (chartOptions, isUpdate) => {
  var hcFunctions = {},
    serializedOptions,
    i = 0;

  serializedOptions = JSON.stringify(chartOptions, function (val, key) {
    var fcId = "###HighchartsFunction" + i + "###";
    if (typeof key === "function") {
      hcFunctions[fcId] = key.toString();
      i++;
      return isUpdate ? key.toString() : fcId;
    }
    return key;
  });
  if (!isUpdate) {
    Object.keys(hcFunctions).forEach(function (key) {
      serializedOptions = serializedOptions.replace(
        '"' + key + '"',
        hcFunctions[key],
      );
    });
  }
  return serializedOptions;
};
