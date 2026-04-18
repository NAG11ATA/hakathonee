import MetricCard from './MetricCard';

function GreenhouseCard({ featuredRoom, isLoading }) {
  const current = featuredRoom?.current || {};
  const target = featuredRoom?.target || {};

  return (
    <section className="dashboard-section">
      <div className="dashboard-card__top-row">
        <div>
          <h2 className="dashboard-card__title">
            {isLoading ? 'Main greenhouse' : featuredRoom?.location || 'Main greenhouse'}
          </h2>
          <div className="dashboard-card__meta">
            <span className="dashboard-green-dot" />
            <span>{featuredRoom?.device_id || 'LOCAL-001'}</span>
            <span>{featuredRoom?.type || 'Demo room'}</span>
          </div>
        </div>

        <div className="dashboard-card__badge">{current.status?.slice(0, 1).toUpperCase() || 'D'}</div>
      </div>

      <div className="dashboard-metrics-grid">
        <MetricCard
          icon="temperature"
          label="Current Temp"
          value={isLoading ? '--' : current.temperature ?? '--'}
          unit="C"
        />
        <MetricCard
          icon="humidity"
          label="Current Humidity"
          value={isLoading ? '--' : current.humidity ?? '--'}
          unit="%"
        />
        <MetricCard
          icon="target-temperature"
          label="Target Temp"
          value={isLoading ? '--' : target.temperature ?? '--'}
          unit="C"
        />
        <MetricCard
          icon="target-humidity"
          label="Target Humidity"
          value={isLoading ? '--' : target.humidity ?? '--'}
          unit="%"
        />
      </div>
    </section>
  );
}

export default GreenhouseCard;
