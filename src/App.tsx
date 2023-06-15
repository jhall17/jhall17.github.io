import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Summary from "./pages/Summary";
import plotly from "./implementations/plotly";
import apexcharts from "./implementations/apexcharts";
import Base from "./pages/Base";
import template from "./implementations/template";

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
          element: <Base charts={template} />,
        },
        {
          path: "/chartist",
          element: <Base charts={template} />,
        },
        {
          path: "/c3js",
          element: <Base charts={template} />,
        },
        {
          path: "/highcharts",
          element: <Base charts={template} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
