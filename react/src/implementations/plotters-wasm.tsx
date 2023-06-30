import { LibraryImplementation } from "../pages/Base";
import init, { Chart } from "wasm";
// import stackedBarData from "../data/stackedBar.json";
// import line1Data from "../data/line1.json";
import line2Data from "../data/line2.json";
// import heatmapData from "../data/heatmap.json";
// import sankeyData from "../data/sankey.json";
// import contourData from "../data/contour.json";

const PlottersWasm: LibraryImplementation = {
  documentation: {
    review: {
      rating: 0,
      description: "",
    },
    url: "",
  },
  reviews: {},
  getStackedBar: function (): JSX.Element {
    return <p>not yet implemented</p>;
  },
  getLine1: function (): JSX.Element {
    return <p>not yet implemented</p>;
  },
  getLine2: function (): JSX.Element {
    init().then(() => {
      const data = {
        x: line2Data["1"].x,
        lines: Object.entries(line2Data).reduce((acc, [name, xyInfo]) => {
          acc[name] = xyInfo.y;
          return acc;
        }, {} as { [name: string]: number[] }),
      };
      Chart.init();
      const chart = Chart.line2("canvas", data);
    });
    return <canvas width="1024px" height="768px" id="canvas"></canvas>;
  },
  getHeatmap: function (): JSX.Element {
    return <p>not yet implemented</p>;
  },
  getSankey: function (): JSX.Element {
    return <p>not yet implemented</p>;
  },
  getJoyPlot: function (): JSX.Element {
    return <p>not yet implemented</p>;
  },
  getContour: function (): JSX.Element {
    return <p>not yet implemented</p>;
  },
};

export default PlottersWasm;
