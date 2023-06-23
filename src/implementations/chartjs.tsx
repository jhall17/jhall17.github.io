import { LibraryImplementation } from "../pages/Base";
import { Bar, Chart, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Colors,
} from "chart.js";
import { SankeyController, Flow } from "chartjs-chart-sankey";
import stackedBarData from "../data/stackedBar.json";
import line1Data from "../data/line1.json";
import line2Data from "../data/line2.json";
import heatmapData from "../data/heatmap.json";
import sankeyData from "../data/sankey.json";
import contourData from "../data/contour.json";

const ChartJSImplementation: LibraryImplementation = {
  documentation: {
    review: {
      rating: 0,
      description: "",
    },
    url: "",
  },
  reviews: {},
  getStackedBar: function (): JSX.Element {
    ChartJS.register(CategoryScale, LinearScale, BarElement, Colors);
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
        };
      }),
    };

    return <Bar data={data} options={options} />;
  },
  getLine1: function (): JSX.Element {
    ChartJS.register(LinearScale, PointElement, LineElement, Colors);

    const data = {
      labels: line1Data.x,
      datasets: [
        {
          label: "Series 1",
          data: line1Data.y,
        },
      ],
    };

    return <Line data={data} />;
  },
  getLine2: function (): JSX.Element {
    ChartJS.register(LinearScale, PointElement, LineElement, Colors);

    const data = {
      labels: line2Data["1"].x,
      datasets: Object.entries(line2Data).map(([dataName, info]) => ({
        label: dataName,
        data: info.y,
      })),
    };

    return <Line data={data} />;
  },
  getHeatmap: function (): JSX.Element {
    return <p>possible, but cumbersome</p>;
  },
  getSankey: function (): JSX.Element {
    ChartJS.register(SankeyController, Flow, Colors);

    const labels: { [key: string]: string } = {};

    sankeyData.label.forEach((label) => {
      labels[label] = label;
    });

    const data = {
      datasets: [
        {
          label: "Sankey",
          labels,
          data: sankeyData.link.source.map((source, index) => {
            return {
              from: sankeyData.label[source],
              to: sankeyData.label[sankeyData.link.target[index]],
              flow: sankeyData.link.value[index],
            };
          }),
        },
      ],
    };

    console.log(data);
    return <Chart type="sankey" data={data} />;
  },
  getJoyPlot: function (): JSX.Element {
    return <p>can be manually crafted from other charts, cumbersome</p>;
  },
  getContour: function (): JSX.Element {
    return <p>not doable</p>;
  },
};

export default ChartJSImplementation;
