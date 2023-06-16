import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Summary from "./pages/Summary";
import plotly from "./implementations/plotly";
import apexcharts from "./implementations/apexcharts";
import visx from "./implementations/visx";
import highcharts from "./implementations/highcharts";
import chartist from "./implementations/chartist";
import c3js from "./implementations/c3js";
import Base from "./pages/Base";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Summary />,
      children: [
        {
          path: "/plotly",
          element: <Base charts={plotly} />,
        },

        {
          path: "/apexcharts",
          element: <Base charts={apexcharts} />,
        },
        {
          path: "/visx",
          element: <Base charts={visx} />,
        },
        {
          path: "/chartist",
          element: <Base charts={chartist} />,
        },
        {
          path: "/c3js",
          element: <Base charts={c3js} />,
        },
        {
          path: "/highcharts",
          element: <Base charts={highcharts} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;