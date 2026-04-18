import { navItems } from '../../data/dashboardData';
import DashboardIcon from './DashboardIcon';

function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button
      className={`dashboard-nav__button ${isActive ? 'is-active' : ''}`}
      onClick={onClick}
      type="button"
    >
      <span className="dashboard-nav__icon">
        <DashboardIcon className="dashboard-icon-svg" name={icon} />
      </span>
      <span className="dashboard-nav__label">{label}</span>
      {isActive ? <span className="dashboard-nav__active-dot" /> : null}
    </button>
  );
}

function BottomNav({ currentRoute, onNavigate }) {
  return (
    <nav className="dashboard-nav">
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          isActive={currentRoute === item.path}
          onClick={() => onNavigate(item.path)}
        />
      ))}
    </nav>
  );
}

export default BottomNav;
