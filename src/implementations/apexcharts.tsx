import { LibraryImplementation } from "../pages/Base";
import Chart from "react-apexcharts";
import stackedBarData from "../data/stackedBar.json";
import line1Data from "../data/line1.json";
import line2Data from "../data/line2.json";
import heatmapData from "../data/heatmap.json";
// import sankeyData from "../data/sankey.json";
// import contourData from "../data/contour.json";

const getLine2Series = () => {
  const series = Object.entries(line2Data).map(([name, data]) => {
    return { name, data: data.y };
  });

  return series;
};

const getHeatmapSeries = () => {
  const series = [];
  for (let i = 0; i < 3; i++) {
    series.push({
      name: heatmapData.y[i],
      data: heatmapData.z[i],
    });
  }

  return series;
};

const apexcharts: LibraryImplementation = {
  documentation: {
    review: {
      rating: 0,
      description:
        "bad redirects, missing lots of info, hard to read, not a lot of documentation for react-specific implementations. unhelpful error messages. great examples page that serves as documentation",
    },
    url: "https://plotly.com/javascript/",
  },
  reviews: {
    ["Bonus"]: {
      rating: 5,
      description: "good built in interaction, animations",
    },
  },
  getStackedBar: function (): JSX.Element {
    return (
      <Chart
        series={stackedBarData.series}
        type="bar"
        width={800}
        height={600}
        options={{
          chart: {
            stacked: true,
          },
        }}
      />
    );
  },
  getLine1: function (): JSX.Element {
    return (
      <Chart
        type="line"
        series={[{ name: "some data", data: line1Data.y }]}
        options={{
          xaxis: {
            categories: line1Data.x,
          },
        }}
        width={800}
        height={600}
      />
    );
  },
  getLine2: function (): JSX.Element {
    return (
      <Chart
        type="line"
        series={getLine2Series()}
        options={{
          xaxis: {
            categories: line2Data["1"].x,
          },
        }}
        width={800}
        height={600}
      />
    );
  },
  getHeatmap: function (): JSX.Element {
    return (
      <Chart
        type="heatmap"
        series={getHeatmapSeries()}
        options={{
          xaxis: {
            categories: heatmapData.x,
          },
        }}
        width={800}
        height={600}
      />
    );
  },
  getSankey: function (): JSX.Element {
    return <p>ApexCharts does not and has no plans to support Sankey</p>;
  },
  getJoyPlot: function (): JSX.Element {
    return (
      <p>
        This may be doable in ApexCharts by customizing line or stacked area or
        similar, but it is tedious, I will come back to this if I have time
      </p>
    );
  },
  getContour: function (): JSX.Element {
    return <p>ApexCharts does not support contour plots</p>;
  },
};

export default apexcharts;
