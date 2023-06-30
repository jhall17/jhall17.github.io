import PlotlyPlot from "react-plotly.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Colors,
} from "chart.js";
import * as Plot from "@observablehq/plot";
import { Line } from "react-chartjs-2";
import init, { Chart as WasmChart } from "wasm";

type LineGraphProps = {
  rawData: any;
  observableRef?: any;
};

export type Comparison = {
  name: string;
  getLineGraph?: React.FunctionComponent<LineGraphProps>;
  getUpperBounds?: () => JSX.Element;
  getUpperBoundsContinued?: () => JSX.Element;
  getCustomGraphs?: () => JSX.Element;
  getPdfs?: () => JSX.Element;
};

import { useEffect, useRef } from "react";

const getPlotlyLineTraces = (rawData) => {
  const x = rawData["x"];
  const lines = rawData["lines"];
  let count = 0;
  const traces = Object.values(lines).map((line: number[]) => {
    count += line.length;
    return {
      x,
      y: line,
      type: "scatter",
      mode: "lines",
    };
  });
  console.log("traces", traces);
  console.log("datapoint count: ", count);
  return traces;
};

const Comparisons: Comparison[] = [
  {
    name: "plotly",
    getLineGraph: ({ rawData }) => {
      return (
        <PlotlyPlot
          data={getPlotlyLineTraces(rawData) as Plotly.Data[]}
          layout={{ width: 800, height: 600 }}
        />
      );
    },
  },
  {
    name: "ChartJS",
    getLineGraph: ({ rawData }) => {
      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Colors
      );
      const options = {
        scales: {
          x: {
            time: {
              unit: "day",
            },
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        animation: false,
      };
      const data = {
        labels: rawData["x"],
        datasets: Object.entries(rawData["lines"]).map(([dataName, info]) => ({
          label: dataName,
          data: info,
        })),
      };
      return <Line data={data} options={options} />;
    },
  },
  {
    name: "Observable Plot",
    getLineGraph: ({ rawData, observableRef: ref }) => {
      const data: any[] = [];
      Object.entries(rawData["lines"]).forEach(([name, lineData]) => {
        rawData["x"].forEach((x, i) => {
          data.push({
            name,
            x,
            y: lineData[i],
          });
        });
      });

      useEffect(() => {
        const chart = Plot.plot({
          marks: [Plot.line(data, { x: "x", y: "y", stroke: "name" })],
        });

        ref.current.appendChild(chart);
        return () => chart.remove();
      });

      return <div ref={ref} />;
    },
  },
  {
    name: "Plotters WASM",
    getLineGraph: ({ rawData }) => {
      init().then(() => {
        WasmChart.init();
        WasmChart.benchmarkLine("canvas", rawData);
      });
      return <canvas width="1024px" height="768px" id="canvas"></canvas>;
    },
  },
];

export default Comparisons;
