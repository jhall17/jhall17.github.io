import fs from "fs";
import bigJson from "big-json";
import monthData from "../alvinMonth.json" assert { type: "json" };

const filteredData = Object.keys(monthData)
  .filter((time) => {
    const date = new Date(time);
    if (date.getUTCDate() === 1) {
      return true;
    }
    return false;
  })
  .reduce((acc, time) => {
    return Object.assign(acc, { [time]: monthData[time] });
  }, {});

console.log("beginning write");
const writeStream = fs.createWriteStream("../alvinDay.json");
const stringifyStream = bigJson.createStringifyStream({
  body: filteredData,
});
stringifyStream.pipe(writeStream);
