import { useEffect, useState } from "react";
import { LibraryImplementation } from "../pages/Base";
import {
  SciChartSurface,
  NumericAxis,
  FastLineRenderableSeries,
  XyDataSeries,
} from "scichart";
// import stackedBarData from "../data/stackedBar.json";
// import line1Data from "../data/line1.json";
import line2Data from "../data/line2.json";
// import heatmapData from "../data/heatmap.json";
// import sankeyData from "../data/sankey.json";
// import contourData from "../data/contour.json";

const DIV_ID = "scichart-div";

const drawLine2 = async () => {
  const { sciChartSurface, wasmContext } = await SciChartSurface.create(DIV_ID);

  const xAxis = new NumericAxis(wasmContext);
  const yAxis = new NumericAxis(wasmContext);

  sciChartSurface?.xAxes.add(xAxis);
  sciChartSurface?.yAxes.add(yAxis);

  Object.entries(line2Data).forEach(([name, xyInfo]) => {
    const xyDataSeries = new XyDataSeries(wasmContext);
    xyInfo.x.forEach((x, i) => {
      xyDataSeries.append(x, xyInfo.y[i]);
    });

    xyDataSeries.dataSeriesName = name;

    const lineSeries = new FastLineRenderableSeries(wasmContext, {
      dataSeries: xyDataSeries,
    });

    sciChartSurface?.renderableSeries.add(lineSeries);
  });

  return { sciChartSurface, wasmContext };
};

const SciChart: LibraryImplementation = {
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
    const [sciChartSurface, setSciChartSurface] = useState<SciChartSurface>();

    useEffect(() => {
      (async () => {
        const res = await drawLine2();
        setSciChartSurface(res.sciChartSurface);
      })();

      return () => sciChartSurface?.delete();
    }, []);
    return <div id={DIV_ID} />;
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

export default SciChart;
