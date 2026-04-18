import { useState } from 'react';
import DashboardIcon from './DashboardIcon';

function ControlCard({ icon, name, defaultActive = false }) {
  const [isActive, setIsActive] = useState(defaultActive);

  return (
    <article className="dashboard-control-card">
      <div className="dashboard-control-card__top-row">
        <span className="dashboard-control-card__icon">
          <DashboardIcon className="dashboard-icon-svg" name={icon} />
        </span>

        <label className="dashboard-control-card__toggle">
          <input
            className="dashboard-control-card__toggle-input"
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive((prev) => !prev)}
          />
          <span className="dashboard-control-card__toggle-track">
            <span className="dashboard-control-card__toggle-thumb" />
          </span>
        </label>
      </div>

      <p className="dashboard-control-card__name">{name}</p>
      <p
        className={`dashboard-control-card__status ${
          isActive ? 'is-active' : 'is-inactive'
        }`}
      >
        {isActive ? 'Active' : 'Inactive'}
      </p>
    </article>
  );
}

export default ControlCard;
