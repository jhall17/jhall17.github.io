import PlotlyPlot from "react-plotly.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Colors,
} from "chart.js";
import { Line } from "react-chartjs-2";

export type Comparison = {
  name: string;
  getLineGraph?: () => JSX.Element;
  getUpperBounds?: () => JSX.Element;
  getUpperBoundsContinued?: () => JSX.Element;
  getCustomGraphs?: () => JSX.Element;
  getPdfs?: () => JSX.Element;
};

import rawData from "../data/alvinMaxVoltage.json";

// const jsonFilePath = "src/data/alvinMaxVoltage.json";
// const readStream = fs.createReadStream(jsonFilePath);

const getPlotlyLineTraces = () => {
  const x = rawData["x"];
  console.log("got x");
  const lines = rawData["lines"];
  console.log("got lines");
  const traces = Object.values(lines).map((line) => {
    console.log("line");
    return {
      x,
      y: line,
      type: "scatter",
      mode: "lines+markers",
    };
  });
  console.log("returning traces");
  return traces;
};

const Comparisons: Comparison[] = [
  {
    name: "plotly",
    getLineGraph: () => {
      console.log(getPlotlyLineTraces());
      return (
        <p>graph</p>
        // <PlotlyPlot
        //   data={getPlotlyLineTraces() as Plotly.Data[]}
        //   layout={{ width: 800, height: 600 }}
        // />
      );
    },
  },
  {
    name: "ChartJS",
    getLineGraph: () => {
      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Colors
      );
      const data = {
        labels: rawData["x"],
        datasets: Object.entries(rawData["lines"]).map(([dataName, info]) => ({
          label: dataName,
          data: info,
        })),
      };
      return <Line data={data} />;
    },
  },
  { name: "Observable Plot" },
];

export default Comparisons;
