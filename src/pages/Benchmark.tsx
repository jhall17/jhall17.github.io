import { Comparison } from "../implementations/benchmark";
import { parse } from "csv-parse";

type BenchmarkProps = {
  comparisons: Comparison[];
};

const Benchmark = ({ comparisons }: BenchmarkProps) => {
  const getRunButtons = () =>
    comparisons.map((comparison) => {
      return <button key={comparison.name}>{comparison.name}</button>;
    });

  const lineGraphs = comparisons.map((comparison) => {
    return comparison.getLineGraph?.();
  });

  return (
    <>
      <h2>
        This benchmark compares the top 3 choices from the base comparison.
        These are plotly.js, ChartJS, and Observable Plot
      </h2>
      {getRunButtons()}
      <h3>Line Graph</h3>
      <blockquote>
        "I would like you to try testing a line graph that puts all the max cell
        voltage for each rack in one graph with time on the x-axis... In a graph
        like this, you could see why the hover functionality that shows the
        value for each signal would be so helpful, so please check that it is
        possible as well."
      </blockquote>
      {lineGraphs}
      <h3>Upper Bounds</h3>
      <blockquote>
        "I would also like to test any upper bounds on what the graphing library
        can handle. If you were to throw in max and min voltage for each rack in
        one graph would it render?"
      </blockquote>
      <h3>Upper Bounds - continued</h3>
      <blockquote>
        "If that works, try throwing in max/min V and temperature for each rack
        (I know units are different but we can ignore that for now) and see if
        it renders. That would be 176 signals with 1min data for 30 days
        (253,440 datapoints in total) which should be more than we would ever
        see in reality."
      </blockquote>
      <h3>Custom Graphs</h3>
      <blockquote>
        "For the custom graphs... a user can select multiple signals from the
        top area and if the unit isn’t already represented in an axis, a new
        axis is generated to the left. In this page there could be 4-5 axis and
        the graph would still overlay on top which really helps identify
        correlation on multiple data points."
      </blockquote>
      <h3>PDFs</h3>
      <blockquote>
        "The only other thing of major interest is the ability to create pdfs
        with that library. As we were brainstorming that might not even need to
        natively use the library itself and could possibly just rely on
        screengrabs of the graph."
      </blockquote>
    </>
  );
};

export default Benchmark;
