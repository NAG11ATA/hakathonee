function HomePage({ onOpenDashboard }) {
  const highlights = [
    {
      title: 'Live greenhouse monitoring',
      description:
        'Track temperature, humidity, irrigation status, and greenhouse activity from one clean interface.',
    },
    {
      title: 'Fast API integration',
      description:
        'Connect your backend once, receive JSON data, and display it instantly in a practical control dashboard.',
    },
    {
      title: 'Built for smart farming',
      description:
        'The project helps growers react faster, reduce waste, and understand greenhouse conditions in real time.',
    },
  ];

  const flowItems = [
    'Sensors and devices send readings to the backend API.',
    'The frontend requests live JSON data with GET endpoints.',
    'Operators can trigger actions and send updates with POST requests.',
  ];

  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero__copy">
          <span className="landing-hero__eyebrow">Smart Agriculture Project</span>
          <h1 className="landing-hero__title">A simple greenhouse dashboard built for monitoring and action.</h1>
          <p className="landing-hero__description">
            This project is designed to help teams supervise greenhouse conditions, read live environmental data,
            and interact with automation systems through a clear web interface.
          </p>

          <div className="landing-hero__actions">
            <a className="landing-button landing-button--primary" href="#overview">
              Explore the project
            </a>
            <button className="landing-button landing-button--secondary" onClick={onOpenDashboard} type="button">
              Open Dashboard
            </button>
          </div>
        </div>

        <div className="landing-preview" aria-label="Project preview card">
          <div className="landing-preview__header">
            <div>
              <h2 className="landing-preview__title">Serre A1</h2>
              <p className="landing-preview__subtitle">Connected greenhouse overview</p>
            </div>
            <div className="landing-preview__icon">🌡️</div>
          </div>

          <div className="landing-preview__grid">
            <article className="landing-preview__metric">
              <span className="landing-preview__metric-icon">🌡️</span>
              <span className="landing-preview__metric-label">Temperature</span>
              <strong className="landing-preview__metric-value">24°C</strong>
            </article>

            <article className="landing-preview__metric">
              <span className="landing-preview__metric-icon">💧</span>
              <span className="landing-preview__metric-label">Humidity</span>
              <strong className="landing-preview__metric-value">62%</strong>
            </article>
          </div>
        </div>
      </section>

      <section className="landing-section" id="overview">
        <div className="landing-section__intro">
          <span className="landing-section__eyebrow">Overview</span>
          <h2 className="landing-section__title">What this project is about</h2>
          <p className="landing-section__text">
            The goal is to create a smart greenhouse web application that makes monitoring easier, control clearer,
            and system data more useful for day-to-day decisions.
          </p>
        </div>

        <div className="landing-cards">
          {highlights.map((item) => (
            <article key={item.title} className="landing-card">
              <h3 className="landing-card__title">{item.title}</h3>
              <p className="landing-card__text">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section--accent" id="api-flow">
        <div className="landing-section__intro">
          <span className="landing-section__eyebrow">Data Flow</span>
          <h2 className="landing-section__title">How the application works with the API</h2>
          <p className="landing-section__text">
            The frontend is prepared to receive JSON responses from the backend and send user actions back through
            dedicated API endpoints.
          </p>
        </div>

        <div className="landing-flow">
          {flowItems.map((item) => (
            <div key={item} className="landing-flow__item">
              <span className="landing-flow__bullet" />
              <p className="landing-flow__text">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section--compact">
        <div className="landing-cta">
          <div>
            <span className="landing-section__eyebrow">Purpose</span>
            <h2 className="landing-section__title">Why this matters</h2>
            <p className="landing-section__text">
              The application is meant to give greenhouse operators a faster way to observe conditions, make decisions,
              and interact with automated systems from one place.
            </p>
          </div>

          <div className="landing-cta__box">
            <span className="landing-cta__label">Main objective</span>
            <strong className="landing-cta__value">Monitor, understand, and control the greenhouse in real time.</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
