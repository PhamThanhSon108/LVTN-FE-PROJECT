const renderError = (errors) => {
  const message = errors.find((error) => error?.error)?.message;
  if (message) return <span style={{ color: 'var(--error-color)' }}>{message}</span>;
};

export { renderError };
