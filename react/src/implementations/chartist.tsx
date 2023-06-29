import { LibraryImplementation } from "../pages/Base";
// import stackedBarData from "../data/stackedBar.json";
// import line1Data from "../data/line1.json";
// import line2Data from "../data/line2.json";
// import heatmapData from "../data/heatmap.json";
// import sankeyData from "../data/sankey.json";
// import contourData from "../data/contour.json";

const chartist: LibraryImplementation = {
  documentation: {
    review: {
      rating: 0,
      description:
        "chartist does not have current react support and would require a wrapper, not worth considering at this time",
    },
    url: "https://github.com/chartist-js/chartist#readme",
  },
  reviews: {},
  getStackedBar: function (): JSX.Element {
    return <p>not yet implemented</p>;
  },
  getLine1: function (): JSX.Element {
    return <p>not yet implemented</p>;
  },
  getLine2: function (): JSX.Element {
    return <p>not yet implemented</p>;
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

export default chartist;
