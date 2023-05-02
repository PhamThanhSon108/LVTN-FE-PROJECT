const handleOverrideURL = (queryKeys = [{ key: '', value: '', empty: false }]) => {
  return queryKeys.reduce((queryString, query, index) => {
    if (query.value || query.empty) {
      return queryString.concat(`${index === 0 ? '?' : '&'}${query.key}=${query.value}`);
    }
    return queryString;
  }, '');
};
export { handleOverrideURL };
