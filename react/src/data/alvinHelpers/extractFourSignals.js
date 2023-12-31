import fs from "fs";
import bigJson from "big-json";

const filePaths = {
  // hour: {
  //   in: "../alvinHour.json",
  //   out: "../alvinHour4Signals.json",
  // },
  day: {
    in: "../alvinDay.json",
    out: "../alvinDay4Signals.json",
  },
  // month: {
  //   in: "../alvinMonth.json",
  //   out: "../alvinMonth4Signals.json",
  // },
};

const extensions = [
  "_MaxCellVoltage",
  "_MinCellVoltage",
  "_MaxCellTemperature",
  "_MinCellTemperature",
];

const extract = (inPath, outPath) => {
  const readStream = fs.createReadStream(inPath);
  const parseStream = bigJson.createParseStream();

  parseStream.on("data", (rawData) => {
    console.log("beginning transform for", inPath);
    const x = [];
    const transformed = {};
    Object.entries(rawData).forEach(([time, minuteData]) => {
      x.push(time);

      for (let ess = 1; ess <= 4; ess++) {
        for (let rack = 1; rack <= 11; rack++) {
          const baseName = `ESS0${ess}_R${rack}`;
          extensions.forEach((extension) => {
            const fieldName = baseName + extension;
            if (!(fieldName in minuteData))
              console.warn(`${fieldName} not found in ${time}`);
            if (!(fieldName in transformed)) transformed[fieldName] = [];
            transformed[fieldName].push(minuteData[fieldName] ?? "");
          });
        }
      }
    });

    console.log("beginning write");
    const writeStream = fs.createWriteStream(outPath);
    const stringifyStream = bigJson.createStringifyStream({
      body: { x, lines: transformed },
    });
    stringifyStream.pipe(writeStream);
  });

  console.log("beginning parse");
  readStream.pipe(parseStream);
};

Object.values(filePaths).forEach(({ in: inPath, out: outPath }) =>
  extract(inPath, outPath)
);
