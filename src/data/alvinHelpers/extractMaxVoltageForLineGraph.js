import fs from "fs";
import bigJson from "big-json";

const jsonFilePath = "../alvinMonth.json";

const readStream = fs.createReadStream(jsonFilePath);
const parseStream = bigJson.createParseStream();

parseStream.on("data", (rawData) => {
  console.log("beginning transform");
  const x = [];
  const transformed = {};
  Object.entries(rawData).forEach(([time, minuteData]) => {
    x.push(time);

    for (let ess = 1; ess <= 4; ess++) {
      for (let rack = 1; rack <= 11; rack++) {
        const fieldName = `ESS0${ess}_R${rack}_MaxCellVoltage`;
        console.log("transforming", fieldName);
        if (!(fieldName in minuteData))
          console.warn(`${fieldName} not found in ${time}`);
        if (!(fieldName in transformed)) transformed[fieldName] = [];
        transformed[fieldName].push(minuteData[fieldName] ?? "");
      }
    }
  });

  console.log("beginning write");
  const writeStream = fs.createWriteStream("../alvinMonthMaxVoltage.json");
  const stringifyStream = bigJson.createStringifyStream({
    body: { x, lines: transformed },
  });
  stringifyStream.pipe(writeStream);
});

console.log("beginning parse");
readStream.pipe(parseStream);
