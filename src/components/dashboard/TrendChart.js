const TIME_LABELS = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
const FALLBACK_SERIES = [22, 24, 27, 29, 31, 28, 25];
const Y_AXIS_VALUES = [36, 32, 28, 24, 20];
const CHART_WIDTH = 100;
const CHART_HEIGHT = 100;
const PADDING = { top: 8, right: 6, bottom: 10, left: 6 };

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function buildSeries(rooms) {
  if (!Array.isArray(rooms)) {
    return FALLBACK_SERIES;
  }

  const values = rooms
    .map((room) => Number(room.current?.temperature))
    .filter((value) => Number.isFinite(value));

  if (values.length >= TIME_LABELS.length) {
    return values.slice(0, TIME_LABELS.length);
  }

  if (!values.length) {
    return FALLBACK_SERIES;
  }

  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const offset = average - 27;

  return FALLBACK_SERIES.map((value) => Math.round(clamp(value + offset, 20, 36)));
}

function getPointX(index, total) {
  const usableWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  return PADDING.left + (index / Math.max(total - 1, 1)) * usableWidth;
}

function getPointY(value) {
  const minValue = 20;
  const maxValue = 36;
  const usableHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const ratio = (value - minValue) / (maxValue - minValue);
  return CHART_HEIGHT - PADDING.bottom - ratio * usableHeight;
}

function createSmoothPath(points) {
  if (!points.length) {
    return '';
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const controlX = (current.x + next.x) / 2;

    path += ` Q ${controlX} ${current.y}, ${next.x} ${next.y}`;
  }

  return path;
}

function TrendChart({ featuredRoom, isLoading }) {
  const series = buildSeries(featuredRoom ? [featuredRoom] : []);
  const points = series.map((value, index) => ({
    value,
    x: getPointX(index, series.length),
    y: getPointY(value),
  }));
  const maxValue = Math.max(...series);
  const subtitle = isLoading
    ? 'Temperature - Loading...'
    : `Temperature - ${featuredRoom?.location || 'Greenhouse A1'}`;
  const path = createSmoothPath(points);

  return (
    <section className="dashboard-section dashboard-chart">
      <div className="dashboard-chart__header">
        <div>
          <h2 className="dashboard-chart__title">Tendance (12h)</h2>
          <p className="dashboard-chart__subtitle">{subtitle}</p>
        </div>

        <span className="dashboard-chart__badge">MAX: {maxValue}°C</span>
      </div>

      <div className="dashboard-chart__plot">
        <div className="dashboard-chart__y-axis" aria-hidden="true">
          {Y_AXIS_VALUES.map((value) => (
            <span className="dashboard-chart__axis-value" key={value}>
              {value}
            </span>
          ))}
        </div>

        <svg
          className="dashboard-chart__svg"
          preserveAspectRatio="none"
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          role="img"
          aria-label="12 hour temperature trend"
        >
          {Y_AXIS_VALUES.map((value) => {
            const y = getPointY(value);

            return (
              <line
                className="dashboard-chart__grid-line"
                key={value}
                x1={PADDING.left}
                x2={CHART_WIDTH - PADDING.right}
                y1={y}
                y2={y}
              />
            );
          })}

          <path className="dashboard-chart__line" d={path} />

          {points.map((point, index) => (
            <circle
              className="dashboard-chart__point"
              cx={point.x}
              cy={point.y}
              key={`${TIME_LABELS[index]}-${point.value}`}
              r="1.7"
            />
          ))}
        </svg>
      </div>

      <div className="dashboard-chart__labels">
        {TIME_LABELS.map((label) => (
          <span className="dashboard-chart__label" key={label}>
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}

export default TrendChart;
