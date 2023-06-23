import { LibraryImplementation } from "../pages/Base";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import stackedBarData from "../data/stackedBar.json";
import line1Data from "../data/line1.json";
import line2Data from "../data/line2.json";
import heatmapData from "../data/heatmap.json";
import sankeyData from "../data/sankey.json";
import contourData from "../data/contour.json";

const ChartJS: LibraryImplementation = {
  documentation: {
    review: {
      rating: 0,
      description: "",
    },
    url: "",
  },
  reviews: {},
  getStackedBar: function (): JSX.Element {
    Chart.register(CategoryScale, LinearScale, BarElement);
    const options = {
      scales: {
        y: {
          stacked: true,
        },
        x: {
          stacked: true,
        },
      },
    };

    const data = {
      labels: stackedBarData.categories,
      datasets: stackedBarData.series.map((seriesInfo) => {
        return {
          label: seriesInfo.name,
          data: seriesInfo.data,
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`,
        };
      }),
    };

    return <Bar data={data} options={options} />;
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

export default ChartJS;
