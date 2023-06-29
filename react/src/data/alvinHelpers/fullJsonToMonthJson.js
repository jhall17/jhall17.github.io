import fs from "fs";
import bigJson from "big-json";

const jsonFilePath = "../alvin.json";

const readStream = fs.createReadStream(jsonFilePath);
const parseStream = bigJson.createParseStream();

parseStream.on("data", (rawData) => {
  const filteredData = Object.keys(rawData)
    .filter((time) => {
      const date = new Date(time);
      if (date.getUTCMonth() === 8) {
        return true;
      }
      return false;
    })
    .reduce((acc, time) => {
      return Object.assign(acc, { [time]: rawData[time] });
    }, {});

  console.log("beginning write");
  const writeStream = fs.createWriteStream("../alvinMonth.json");
  const stringifyStream = bigJson.createStringifyStream({
    body: filteredData,
  });
  stringifyStream.pipe(writeStream);
});

console.log("beginning read");
readStream.pipe(parseStream);
