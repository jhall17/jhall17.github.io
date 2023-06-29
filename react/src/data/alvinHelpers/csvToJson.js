import fs from "fs";
import { parse } from "csv-parse";
import bigJson from "big-json";
const csvFilePath = "../Alvin_September_2022.csv";
const outputFilePath = "../alvin.json";

let i = 0;
let labels;
const jsonObj = {};
const parser = fs.createReadStream(csvFilePath).pipe(parse({ delimiter: "," }));
for await (const record of parser) {
  if (i === 0) {
    labels = record;
  } else {
    const uniqueTime = record[1];
    jsonObj[uniqueTime] = {};
    for (let j = 2; j < labels.length; j++) {
      jsonObj[uniqueTime][labels[j]] = record[j];
    }
  }
  i++;
}

console.log("beginning write");
const writeStream = fs.createWriteStream(outputFilePath);
const stringifyStream = bigJson.createStringifyStream({
  body: jsonObj,
});
stringifyStream.pipe(writeStream);
