function SvgIcon({ children, title, className = '' }) {
  return (
    <svg
      aria-hidden={title ? undefined : 'true'}
      className={className}
      fill="none"
      role={title ? 'img' : 'presentation'}
      viewBox="0 0 24 24"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

function DashboardIcon({ name, className }) {
  const shared = {
    className,
  };

  switch (name) {
    case 'temperature':
      return (
        <SvgIcon {...shared}>
          <path
            d="M12 14.5V5.5a2.5 2.5 0 1 0-5 0v9a4 4 0 1 0 5 0Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path d="M9.5 17.5a1.5 1.5 0 1 0 0-3v3Z" fill="currentColor" />
        </SvgIcon>
      );
    case 'humidity':
      return (
        <SvgIcon {...shared}>
          <path
            d="M12 3.5C9.8 7 7 9.6 7 13a5 5 0 0 0 10 0c0-3.4-2.8-6-5-9.5Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path
            d="M10.5 15.5c.6.7 1.4 1 2.3 1 1.1 0 2.1-.5 2.7-1.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.8"
          />
        </SvgIcon>
      );
    case 'target-temperature':
      return (
        <SvgIcon {...shared}>
          <path
            d="M12 14.5V5.5a2.5 2.5 0 1 0-5 0v9a4 4 0 1 0 5 0Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path d="M16.5 7.5h3M16.5 11h3M16.5 14.5h2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </SvgIcon>
      );
    case 'target-humidity':
      return (
        <SvgIcon {...shared}>
          <path
            d="M9 4.5C6.8 8 4 10.6 4 14a5 5 0 0 0 9.4 2.4"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path d="m14.5 12.5 2 2 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </SvgIcon>
      );
    case 'ventilation':
      return (
        <SvgIcon {...shared}>
          <path
            d="M12 11.5c1 0 1.8-.8 1.8-1.8S13 7.9 12 7.9s-1.8.8-1.8 1.8.8 1.8 1.8 1.8Z"
            fill="currentColor"
          />
          <path
            d="M12 11.5c2.2 0 3.8 1.5 4.5 4.3-2.8.7-5.1-.3-6.2-2.2M12 11.5c-1.1 1.9-3.4 2.9-6.2 2.2.7-2.8 2.3-4.3 4.5-4.3M12 11.5c0-2.2 1.5-3.8 4.3-4.5.7 2.8-.3 5.1-2.2 6.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </SvgIcon>
      );
    case 'irrigation':
      return (
        <SvgIcon {...shared}>
          <path
            d="M5 10.5h14M8 10.5V8a4 4 0 0 1 8 0v2.5M9 14.5a3 3 0 0 0 6 0"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path d="M12 17.5v3M7.5 18.5l1.2 1.2M16.5 18.5l-1.2 1.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </SvgIcon>
      );
    case 'lighting':
      return (
        <SvgIcon {...shared}>
          <path
            d="M12 4.5a5 5 0 0 0-3.1 8.9c.7.6 1.1 1.4 1.1 2.3v.3h4v-.3c0-.9.4-1.7 1.1-2.3A5 5 0 0 0 12 4.5Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path d="M10 18h4M10.5 20.5h3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </SvgIcon>
      );
    case 'heating':
      return (
        <SvgIcon {...shared}>
          <path
            d="M8.5 18.5c-1.2-.8-2-2.1-2-3.6 0-2.7 2.5-4 2.5-6.8 1.7.8 2.7 2.1 2.7 3.8 0 2.4-2 3.7-2 5.9 0 .3 0 .5.1.7ZM15.5 18.5c-1.2-.8-2-2.1-2-3.6 0-2.7 2.5-4 2.5-6.8 1.7.8 2.7 2.1 2.7 3.8 0 2.4-2 3.7-2 5.9 0 .3 0 .5.1.7Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </SvgIcon>
      );
    case 'dashboard':
      return (
        <SvgIcon {...shared}>
          <path
            d="M5 5.5h6.5V12H5zM12.5 5.5H19V9h-6.5zM12.5 10.5H19v8h-6.5zM5 13.5h6.5V19H5z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </SvgIcon>
      );
    case 'rooms':
      return (
        <SvgIcon {...shared}>
          <path
            d="M4.5 8.5 12 4l7.5 4.5V18a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1V8.5ZM9.5 19v-5h5v5"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </SvgIcon>
      );
    case 'home':
      return (
        <SvgIcon {...shared}>
          <path
            d="M4 10.5 12 4l8 6.5M6.5 9.5V19h11V9.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </SvgIcon>
      );
    default:
      return null;
  }
}

export default DashboardIcon;
