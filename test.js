const Log = require("./logger");

(async () => {
  const result = await Log(
    "backend",
    "info",
    "middleware",
    "Logging middleware test successful"
  );

  console.log(result);
})();