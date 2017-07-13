import createStore from "./lib/unistore";

const initialState = { shots: {} };

const store = createStore(initialState);

if (process.env.NODE_ENV !== "production" && window) {
  window.store = store;
}

export default store;
