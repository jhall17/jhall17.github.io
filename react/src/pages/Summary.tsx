import { Link, Outlet } from "react-router-dom";

const Summary = () => {
  return (
    <>
      <h1>React Charting Libraries</h1>
      <ul>
        <li>
          <Link to="/">Summary</Link>
        </li>
        <li>
          <Link to="/plotly">Plotly</Link>
        </li>
        <li>
          <Link to="/chartjs">ChartJS</Link>
        </li>
        <li>
          <Link to="ObservablePlot">Observable Plot</Link>
        </li>
        <li>
          <Link to="/apexcharts">ApexCharts</Link>
        </li>
        <li>
          <Link to="/highcharts">HighCharts</Link>
        </li>
        <li>
          <Link to="/plotters-wasm">Plotters WASM</Link>
        </li>
        <li>
          <Link to="scichart">SciChart</Link>
        </li>
        <li>
          <Link to="/perspective">Perspective</Link>
        </li>
        <li>
          <Link to="/benchmark">Benchmark</Link>
        </li>
        <li>
          <Link to="/visx">VisX - no charts</Link>
        </li>
        <li>
          <Link to="/chartist">Chartist - no charts</Link>
        </li>
        <li>
          <Link to="/c3js">C3.js - no charts</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Summary;
