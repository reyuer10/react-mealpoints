const axios = require("axios");

function handleIntervalExecute() {
  setInterval(async () => {
    try {
      const timeNow = new Date();

      if (timeNow.getMinutes() === 0) {
        const response = await axios.get("http://localhost:3005/add");

        return response.data;
      } else {
        await axios.get("http://localhost:3005/add");
      }
    } catch (error) {
      throw error;
    }
  }, 60 * 1000);
}

module.exports = handleIntervalExecute;
