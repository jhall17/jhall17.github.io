import { LibraryImplementation } from "../pages/Base";
import Plot from "react-plotly.js";
import stackedBarData from "../data/stackedBar.json";
import line1Data from "../data/line1.json";
import line2Data from "../data/line2.json";
import heatmapData from "../data/heatmap.json";
import sankeyData from "../data/sankey.json";
import contourData from "../data/contour.json";

const getBarTraces = () => {
  const { categories, series } = stackedBarData;
  const traces = series.map((s) => {
    return {
      x: categories,
      y: s.data,
      name: s.name,
      type: "bar",
    };
  });

  return traces;
};

const getLine1Traces = () => {
  const { x, y } = line1Data;
  return [{ x, y, type: "scatter", mode: "lines+markers", color: "red" }];
};

const getLine2Traces = () => {
  const traces = Object.values(line2Data).map((d) => {
    return {
      x: d.x,
      y: d.y,
      type: "scatter",
      mode: "lines+markers",
      color: "blue",
    };
  });

  return traces;
};

const getHeatmapTraces = () => {
  const { x, y, z } = heatmapData;
  return [
    {
      x,
      y,
      z,
      type: "heatmap",
    },
  ];
};

const getSankeyTraces = () => {
  const { label, color, link } = sankeyData;
  return [
    {
      orientation: "h",
      node: {
        label,
        color,
      },
      link,
      type: "sankey",
    },
  ];
};

const getContourTraces = () => {
  const { x, y, z } = contourData;
  return [
    {
      x,
      y,
      z,
      type: "contour",
    },
  ];
};

const plotly: LibraryImplementation = {
  documentation: {
    review: {
      rating: 0,
      description:
        "very detailed, great examples, mostly comprehensive. most googling tends to turn up answers in python, though.",
    },
    url: "https://plotly.com/javascript/",
  },
  reviews: {
    ["Bonus"]: {
      rating: 5,
      description: "good built in interaction, download plot, zoom, pan, etc",
    },
  },
  getStackedBar: function (): JSX.Element {
    return (
      <Plot
        data={getBarTraces()}
        layout={{ barmode: "stack", width: 800, height: 600 }}
      />
    );
  },
  getLine1: function (): JSX.Element {
    return (
      <Plot data={getLine1Traces()} layout={{ width: 800, height: 600 }} />
    );
  },
  getLine2: function (): JSX.Element {
    return (
      <Plot data={getLine2Traces()} layout={{ width: 800, height: 600 }} />
    );
  },
  getHeatmap: function (): JSX.Element {
    return (
      <Plot data={getHeatmapTraces()} layout={{ width: 800, height: 600 }} />
    );
  },
  getSankey: function (): JSX.Element {
    return (
      <Plot data={getSankeyTraces()} layout={{ width: 800, height: 600 }} />
    );
  },
  getJoyPlot: function (): JSX.Element {
    return (
      <p>
        This is doable in plotly, but it is tedious, I will come back to this if
        I have time
      </p>
    );
  },
  getContour: function (): JSX.Element {
    return (
      <Plot data={getContourTraces()} layout={{ width: 800, height: 600 }} />
    );
  },
};

export default plotly;
