import DashboardIcon from './DashboardIcon';

function MetricCard({ icon, label, value, unit }) {
  return (
    <article className="dashboard-metric-card">
      <div className="dashboard-metric-card__label-row">
        <span className="dashboard-metric-card__icon">
          <DashboardIcon className="dashboard-icon-svg" name={icon} />
        </span>
        <span className="dashboard-metric-card__label">{label}</span>
      </div>

      <div className="dashboard-metric-card__value-row">
        <span className="dashboard-metric-card__value">{value}</span>
        <span className="dashboard-metric-card__unit">{unit}</span>
      </div>
    </article>
  );
}

export default MetricCard;
