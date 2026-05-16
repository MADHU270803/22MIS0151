// logging_middleware/logger.js

const axios = require("axios");

// Paste the access token you received from the /auth API
const ACCESS_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYWRodW1pdGhhLnkyMDIyQHZpdHN0dWRlbnQuYWMuaW4iLCJleHAiOjE3Nzg5MzQzMzgsImlhdCI6MTc3ODkzMzQzOCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjFkNTdlZmIwLTYzYzYtNGY5Yi05ZDliLTUwNWM1YTkyNjQ3YiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InkubWFkaHVtaXRoYSIsInN1YiI6ImNiY2Y3NGE5LTk3OWMtNDAyYi1hN2RjLWU1MjQ0MzVjMjA0NiJ9LCJlbWFpbCI6Im1hZGh1bWl0aGEueTIwMjJAdml0c3R1ZGVudC5hYy5pbiIsIm5hbWUiOiJ5Lm1hZGh1bWl0aGEiLCJyb2xsTm8iOiIyMm1pczAxNTEiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiJjYmNmNzRhOS05NzljLTQwMmItYTdkYy1lNTI0NDM1YzIwNDYiLCJjbGllbnRTZWNyZXQiOiJwanpVRkhmc3FxbnZ5YVFlIn0.OHpxE18mSeZsN0JyKOZPInloqBLRkiT0absLpK9XftA";

/**
 * Reusable logging function
 * @param {string} stack    - "backend" or "frontend"
 * @param {string} level    - "debug", "info", "warn", "error", "fatal"
 * @param {string} pkg      - allowed package name (e.g. "service", "route")
 * @param {string} message  - descriptive log message
 */
async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    // Do not use console.log(); return the error instead
    return {
      error: true,
      status: error.response?.status,
      message:
        error.response?.data?.message || error.message || "Logging failed",
    };
  }
}

module.exports = Log;