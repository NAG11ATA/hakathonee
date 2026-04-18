import ControlCard from './ControlCard';
import { quickControls } from '../../data/dashboardData';

function QuickControls() {
  return (
    <section className="dashboard-section">
      <div className="dashboard-section__header">
        <h2 className="dashboard-section__title">Quick controls</h2>
        <span className="dashboard-section__link">Local demo</span>
      </div>

      <div className="dashboard-controls-grid">
        {quickControls.map((control, index) => (
          <ControlCard
            key={control.id}
            defaultActive={index < 2}
            icon={control.icon}
            name={control.name}
          />
        ))}
      </div>
    </section>
  );
}

export default QuickControls;
