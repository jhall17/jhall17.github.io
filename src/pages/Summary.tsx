import { Link, Outlet } from "react-router-dom";

const Summary = () => {
  console.log("loading base");
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
          <Link to="/apexcharts">ApexCharts</Link>
        </li>
        <li>
          <Link to="/visx">VisX</Link>
        </li>
        <li>
          <Link to="/chartist">Chartist</Link>
        </li>
        <li>
          <Link to="/c3js">C3.js</Link>
        </li>
        <li>
          <Link to="/highcharts">HighCharts</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Summary;
