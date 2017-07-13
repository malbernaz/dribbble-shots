import createStore from "./lib/unistore";

const initialState = { shots: [], pagesFetched: [], page: 1, loadingShots: true };

const store = createStore(initialState);

if (process.env.NODE_ENV !== "production" && window !== undefined) {
  window.store = store;
}

export default store;
