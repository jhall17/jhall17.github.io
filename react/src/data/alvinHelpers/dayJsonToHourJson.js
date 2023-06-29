import fs from "fs";
import bigJson from "big-json";
import dayData from "../alvinDay.json" assert { type: "json" };

const filteredData = Object.keys(dayData)
  .filter((time) => {
    const date = new Date(time);
    if (date.getUTCHours() === 1) {
      return true;
    }
    return false;
  })
  .reduce((acc, time) => {
    return Object.assign(acc, { [time]: dayData[time] });
  }, {});

console.log("beginning write");
const writeStream = fs.createWriteStream("../alvinHour.json");
const stringifyStream = bigJson.createStringifyStream({
  body: filteredData,
});
stringifyStream.pipe(writeStream);
