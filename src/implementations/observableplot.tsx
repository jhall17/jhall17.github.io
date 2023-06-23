import { LegacyRef, useEffect, useRef } from "react";
import { LibraryImplementation } from "../pages/Base";
import * as d3 from "d3";
import * as Plot from "@observablehq/plot";
import stackedBarData from "../data/stackedBar.json";
import line1Data from "../data/line1.json";
import line2Data from "../data/line2.json";
import heatmapData from "../data/heatmap.json";
// import sankeyData from "../data/sankey.json";
import joyplotData from "../data/joyplot.json";
import contourData from "../data/contour.json";

const ObservablePlot: LibraryImplementation = {
  documentation: {
    review: {
      rating: 0,
      description: "",
    },
    url: "",
  },
  reviews: {},
  getStackedBar: function (): JSX.Element {
    const ref = useRef();

    const data: any[] = [];
    stackedBarData.categories.forEach((categoryName, i) => {
      stackedBarData.series.forEach((seriesInfo) => {
        data.push({
          category: categoryName,
          series: seriesInfo.name,
          data: seriesInfo.data[i],
        });
      });
    });

    useEffect(() => {
      const chart = Plot.plot({
        marks: [Plot.barY(data, { x: "category", y: "data", fill: "series" })],
      });

      ref.current.appendChild(chart);
      return () => chart.remove();
    });
    return <div ref={ref} />;
  },
  getLine1: function (): JSX.Element {
    const ref = useRef();

    const data: any[] = [];
    line1Data.x.forEach((x, i) => {
      data.push({
        x: x,
        y: line1Data.y[i],
      });
    });

    useEffect(() => {
      const chart = Plot.plot({
        marks: [Plot.line(data, { x: "x", y: "y" })],
      });
      ref.current.appendChild(chart);
      return () => chart.remove();
    });
    return <div ref={ref} />;
  },
  getLine2: function (): JSX.Element {
    const ref = useRef();

    const data: any[] = [];
    Object.entries(line2Data).forEach(([name, lineData]) => {
      lineData.x.forEach((x, i) => {
        data.push({
          name,
          x: x,
          y: lineData.y[i],
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
  getHeatmap: function (): JSX.Element {
    const ref = useRef();

    const data: any[] = [];
    heatmapData.x.forEach((x, i) => {
      heatmapData.y.forEach((y, j) => {
        data.push({
          x,
          y,
          z: heatmapData.z[i][j],
        });
      });
    });

    useEffect(() => {
      const chart = Plot.plot({
        padding: 0,
        color: { type: "linear", scheme: "PiYG" },
        marks: [
          Plot.cell(data, { x: "x", y: "y", fill: "z" }),
          Plot.text(data, { x: "x", y: "y", text: "z" }),
        ],
      });

      ref.current.appendChild(chart);
      return () => chart.remove();
    });
    return <div ref={ref} />;
  },
  getSankey: function (): JSX.Element {
    return <p>sankey is doable but tedious, i will come back if i have time</p>;
  },
  getJoyPlot: function (): JSX.Element {
    const ref = useRef();

    useEffect(() => {
      const chart = Plot.plot({
        y: { domain: [0, d3.max(joyplotData, (d) => d.value) / 2] },
        fy: { domain: joyplotData.map((d) => d.name) },
        marks: [
          Plot.areaY(joyplotData, {
            x: "date",
            y: "value",
            fy: "name",
            curve: "basis",
            sort: "date",
            fill: "#ddd",
          }),
          Plot.lineY(joyplotData, {
            x: "date",
            y: "value",
            fy: "name",
            sort: "date",
            curve: "basis",
          }),
        ],
      });
      ref.current.appendChild(chart);
      return () => chart.remove();
    });

    return <div ref={ref} />;
  },
  getContour: function (): JSX.Element {
    return (
      <p>
        doable, not difficult, but not with current contour data. will come back
        if there is time
      </p>
    );
  },
};

export default ObservablePlot;
