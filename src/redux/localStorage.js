export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("windflamesState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("windflamesState", serializedState);
  } catch (e) {}
};
