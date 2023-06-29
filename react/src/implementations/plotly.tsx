import { LibraryImplementation } from "../pages/Base";
import Plot from "react-plotly.js";
import Plotly from "plotly.js";
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
      rating: 4,
      description:
        "very detailed, great examples, mostly comprehensive. most googling tends to turn up answers in python, so you sometimes have to translate if you can't find a js example.",
    },
    url: "https://plotly.com/javascript/",
  },
  reviews: {
    ["React Compatibility"]: {
      rating: 5,
      description: "official react support",
    },
    ["Chart Versatility"]: {
      rating: 5,
      description:
        "built in support for every chart on our list and more. serves as a wrapper on d3, so extremely flexible",
    },
    ["Learning Curve"]: {
      rating: 5,
      description:
        "very easy to use, can start very basic and add in more advanced features as you go",
    },
    ["Data Export"]: {
      rating: 1,
      description: "will export chart images, but not data",
    },
    ["Customizability"]: {
      rating: 5,
      description:
        "could create almost any visual imaginable with this library",
    },
    ["Accessibility"]: {
      rating: 0,
      description:
        "no additional accessibility features, svg may make implementing our own difficult",
    },
    ["Bonus"]: {
      rating: 3,
      description:
        "good built in interaction, zoom, pan, etc, and uses d3, so compatible with Mandy's library",
    },
  },
  getStackedBar: function (): JSX.Element {
    return (
      <Plot
        data={getBarTraces() as Plotly.Data[]}
        layout={{ barmode: "stack", width: 800, height: 600 }}
      />
    );
  },
  getLine1: function (): JSX.Element {
    return (
      <Plot
        data={getLine1Traces() as Plotly.Data[]}
        layout={{ width: 800, height: 600 }}
      />
    );
  },
  getLine2: function (): JSX.Element {
    return (
      <Plot
        data={getLine2Traces() as Plotly.Data[]}
        layout={{ width: 800, height: 600 }}
      />
    );
  },
  getHeatmap: function (): JSX.Element {
    return (
      <Plot
        data={getHeatmapTraces() as Plotly.Data[]}
        layout={{ width: 800, height: 600 }}
      />
    );
  },
  getSankey: function (): JSX.Element {
    return (
      <Plot
        data={getSankeyTraces() as Plotly.Data[]}
        layout={{ width: 800, height: 600 }}
      />
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
      <Plot
        data={getContourTraces() as Plotly.Data[]}
        layout={{ width: 800, height: 600 }}
      />
    );
  },
};

export default plotly;
