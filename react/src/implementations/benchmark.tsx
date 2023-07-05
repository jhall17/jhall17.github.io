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
import {
  SciChartSurface,
  FastLineRenderableSeries,
  XyDataSeries,
  NumericAxis,
  DateTimeNumericAxis,
  EResamplingMode,
} from "scichart";

type LineGraphProps = {
  rawData: RawData;
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

import { useEffect, useRef, useState } from "react";

type RawData = {
  x: number[];
  lines: { [key: string]: number[] };
};

const getPlotlyLineTraces = (rawData: RawData) => {
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
      // @ts-ignore
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
          x: {
            type: "time",
          },
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
        WasmChart.benchmark_line("canvas", rawData);
      });
      return <canvas width="1024px" height="768px" id="canvas"></canvas>;
    },
  },
  {
    name: "SciChart",
    getLineGraph: ({ rawData }) => {
      const [curSurface, setCurSurface] = useState<SciChartSurface>();
      const DIV_ID = "scichart-div";

      const draw = async () => {
        const { sciChartSurface, wasmContext } = await SciChartSurface.create(
          DIV_ID
        );

        const xAxis = new DateTimeNumericAxis(wasmContext);
        const yAxis = new NumericAxis(wasmContext);

        sciChartSurface.xAxes.add(xAxis);
        sciChartSurface.yAxes.add(yAxis);

        Object.entries(rawData.lines).forEach(([name, yVals]) => {
          const dataSeries = new XyDataSeries(wasmContext, {
            xValues: rawData.x.map((x) => new Date(x).getTime()),
            yValues: yVals.map((y) => Number(y)),
            dataSeriesName: name,
            dataIsSortedInX: true,
            dataEvenlySpacedInX: true,
            containsNaN: false,
          });
          const lineSeries = new FastLineRenderableSeries(wasmContext, {
            dataSeries,
            resamplingMode: EResamplingMode.Auto,
          });
          sciChartSurface.renderableSeries.add(lineSeries);
        });

        return { sciChartSurface, wasmContext };
      };

      useEffect(() => {
        (async () => {
          const res = await draw();
          setCurSurface(res.sciChartSurface);
        })();

        return () => curSurface?.delete();
      }, []);

      return <div id={DIV_ID} style={{ width: 800, height: 600 }} />;
    },
  },
];

export default Comparisons;
