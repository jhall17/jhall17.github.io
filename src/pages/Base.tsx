type BaseProps = {
  charts: LibraryImplementation;
};

export type Review = {
  rating: number;
  description: string;
};

export interface LibraryImplementation {
  documentation: {
    review: Review;
    url: string;
  };
  reviews: {
    [reviewName: string]: Review;
  };
  // reactCompatibilty: {
  //   review: Review;
  // };
  // chartVersatility: {
  //   review: Review;
  // };
  // learningCurve: {
  //   review: Review;
  // };
  // dataExport: {
  //   review: Review;
  // };
  // customizability: {
  //   review: Review;
  // };
  // accessibility: {
  //   review: Review;
  // };
  // bonus: {
  //   review: Review;
  // };
  getStackedBar: () => JSX.Element;
  getLine1: () => JSX.Element;
  getLine2: () => JSX.Element;
  getHeatmap: () => JSX.Element;
  getSankey: () => JSX.Element;
  getJoyPlot: () => JSX.Element;
  getContour: () => JSX.Element;
}

const ReviewDisplay = ({ review }: { review: Review }) => {
  return (
    <>
      <h3>Rating</h3>
      <p>{review.rating / 5}</p>
      <h3>Description</h3>
      <p>{review.description}</p>
    </>
  );
};

const Base = ({ charts }: BaseProps) => {
  const reviews = Object.entries(charts.reviews).map(([reviewName, review]) => {
    return (
      <>
        <h2>{reviewName}</h2>
        <ReviewDisplay review={review} />
      </>
    );
  });

  return (
    <>
      <h2>Charts</h2>
      <h3>Stacked Bar</h3>
      {charts.getStackedBar()}
      <h3>Line 1</h3>
      {charts.getLine1()}
      <h3>Line 2</h3>
      {charts.getLine2()}
      <h3>Heatmap</h3>
      {charts.getHeatmap()}
      <h3>Sankey</h3>
      {charts.getSankey()}
      <h3>Joyplot</h3>
      {charts.getJoyPlot()}
      <h3>Contour</h3>
      {charts.getContour()}

      <a href={charts.documentation.url}>
        <h2>Documentation</h2>
      </a>
      <ReviewDisplay review={charts.documentation.review} />

      {reviews}
      {/* 
      <h2>React Compatibility</h2>
      <ReviewDisplay review={charts.reactCompatibilty.review} />

      <h2>Chart Versatility</h2>
      <ReviewDisplay review={charts.chartVersatility.review} />

      <h2>Learning Curve</h2>
      <ReviewDisplay review={charts.learningCurve.review} />

      <h2>Data Export</h2>
      <ReviewDisplay review={charts.dataExport.review} />

      <h2>Customizability</h2>
      <ReviewDisplay review={charts.customizability.review} />

      <h2>Accessibility</h2>
      <ReviewDisplay review={charts.accessibility.review} />

      <h2>Bonus</h2>
      <ReviewDisplay review={charts.bonus.review} />
      */}
    </>
  );
};

export default Base;
