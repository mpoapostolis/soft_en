export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("myProjectState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = state => {
  const { account } = state;
  try {
    const serializedState = JSON.stringify({ account });
    localStorage.setItem("myProjectState", serializedState);
  } catch (e) {}
};
