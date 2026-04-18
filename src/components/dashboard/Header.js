function Header({ featuredRoom, isLoading, roomCount }) {
  const title = isLoading ? 'Loading dashboard...' : featuredRoom?.location || 'Greenhouse overview';
  const subtitle = isLoading
    ? 'Preparing local greenhouse insights.'
    : `Track ${roomCount} room${roomCount === 1 ? '' : 's'} with a frontend-only preview.`;

  return (
    <header className="dashboard-header">
      <div className="dashboard-header__content">
        <span className="dashboard-header__badge">
          <span className="dashboard-header__badge-dot" />
          Offline Mode
        </span>
        <h1 className="dashboard-header__title">{title}</h1>
        <p className="dashboard-header__subtitle">{subtitle}</p>
      </div>

      <div className="dashboard-header__avatar">GH</div>
    </header>
  );
}

export default Header;
