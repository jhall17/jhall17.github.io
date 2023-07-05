import { LibraryImplementation } from "../pages/Base";
// import stackedBarData from "../data/stackedBar.json";
// import line1Data from "../data/line1.json";
import line2Data from "../data/line2.json";
// import heatmapData from "../data/heatmap.json";
// import sankeyData from "../data/sankey.json";
// import contourData from "../data/contour.json";

import perspective from "@finos/perspective";
import "@finos/perspective-viewer";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";
import "@finos/perspective-viewer/dist/umd/all-themes.css";
import { useEffect, useRef } from "react";

const worker = perspective.shared_worker();

const Perspective: LibraryImplementation = {
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
    const viewerRef = useRef();

    useEffect(() => {
      let ignore = false;
      const load = async () => {
        if (ignore) return;

        const table = await worker.table(line2Data);

        await viewerRef.current.load(table);
      };

      load();

      return () => {
        ignore = true;
      };
    }, []);

    return <perspective-viewer ref={viewerRef} />;
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

export default Perspective;
