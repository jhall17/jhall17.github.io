import { LibraryImplementation } from "../pages/Base";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import HighchartsSankey from "highcharts/modules/sankey";
import stackedBarData from "../data/stackedBar.json";
import line1Data from "../data/line1.json";
import line2Data from "../data/line2.json";
import heatmapData from "../data/heatmap.json";
import sankeyData from "../data/sankey.json";
// import contourData from "../data/contour.json";

const highcharts: LibraryImplementation = {
  documentation: {
    review: {
      rating: 4,
      description:
        "very detailed, great examples. some types can be hard to find in documentation and it can be unclear why you're facing typing issues",
    },
    url: "https://www.highcharts.com/docs/index",
  },
  reviews: {
    ["React Compatibility"]: {
      rating: 5,
      description: "official react support",
    },
    ["Chart Versatility"]: {
      rating: 4,
      description:
        "lots of charts built in, and quite adaptable to create new charts yourself",
    },
    ["Learning Curve"]: {
      rating: 3,
      description:
        "can be confusing at first, and typing is convoluted, but overall relatively easy to learn",
    },
    ["Data Export"]: {
      rating: 5,
      description: "built in customizable data export",
    },
    ["Customizability"]: {
      rating: 5,
      description:
        "has very nice looking defaults, but is still very easy to customize",
    },
    ["Accessibility"]: {
      rating: 5,
      description: "built in accessiblity features support WCAG 2.1",
    },
    ["Bonus"]: {
      rating: -2,
      description:
        "while this is a top performer, it is a paid product and not cheap",
    },
  },
  getStackedBar: function (): JSX.Element {
    const options: Highcharts.Options = {
      title: {
        text: "Stacked bar chart",
      },
      chart: {
        type: "bar",
      },
      xAxis: {
        categories: stackedBarData.categories,
      },
      plotOptions: {
        series: {
          stacking: "normal",
        },
      },
      series: stackedBarData.series as Highcharts.SeriesOptionsType[],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
  },
  getLine1: function (): JSX.Element {
    const options: Highcharts.Options = {
      chart: {
        type: "line",
      },
      xAxis: {
        categories: line1Data.x.map(String),
      },
      series: [
        {
          name: "line1",
          data: line1Data.y as Highcharts.XrangePointOptionsObject[],
          type: "line",
        },
      ],
    };
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  },
  getLine2: function (): JSX.Element {
    const options: Highcharts.Options = {
      chart: {
        type: "line",
      },
      xAxis: {
        categories: line2Data["1"].x.map(String),
      },
      series: Object.entries(line2Data).map(([name, xyObj]) => ({
        name,
        data: xyObj.y as Highcharts.XrangePointOptionsObject[],
        type: "line",
      })),
    };
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  },
  getHeatmap: function (): JSX.Element {
    HighchartsHeatmap(Highcharts);
    const zData = [];
    for (let i = 0; i < heatmapData.z.length; i++) {
      for (let j = 0; j < heatmapData.z[i].length; j++) {
        zData.push([i, j, heatmapData.z[i][j]]);
      }
    }
    const options: Highcharts.Options = {
      chart: {
        type: "heatmap",
      },
      xAxis: {
        categories: heatmapData.x,
      },
      yAxis: {
        categories: heatmapData.y,
      },
      series: [
        {
          name: "heatmap",
          data: zData,
          type: "heatmap",
        },
      ],
      colorAxis: {
        min: 0,
        minColor: "#FFFFFF",
        maxColor: "#0000FF",
      },
      legend: {
        align: "right",
        layout: "vertical",
        margin: 0,
        verticalAlign: "top",
        y: 35,
        symbolHeight: 280,
      },
    };
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  },
  getSankey: function (): JSX.Element {
    HighchartsSankey(Highcharts);
    const { label, link } = sankeyData;
    const data: (string | number)[][] = [];
    link.source.forEach((source, i) => {
      data.push([label[source], label[link.target[i]], link.value[i]]);
    });

    const options: Highcharts.Options = {
      series: [
        {
          keys: ["from", "to", "weight"],
          data: data,
          type: "sankey",
        },
      ],
    };
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  },
  getJoyPlot: function (): JSX.Element {
    return <p>this is possible in highcharts, but it is tedious</p>;
  },
  getContour: function (): JSX.Element {
    return (
      <p>
        there is a dated library that allows for contours, but I was not able to
        get it to work
      </p>
    );
  },
};

export default highcharts;
