import * as api from "./lib/dribbbleService";
import store from "./store";

export function fetchShots(page) {
  store.setState({ loadingShots: true });
  const { shots: prevShots, pagesFetched } = store.getState();
  if (pagesFetched.some(p => p === page)) return;
  return api
    .fetchShots(page || 1)
    .then(shots => {
      store.setState({
        pagesFetched: [...pagesFetched, page],
        lastPage: shots.length % 24 !== 0,
        shots: [...prevShots, ...shots],
        loadingShots: false,
        page
      });
      return shots;
    })
    .catch(() => {
      store.setState({ loadingShots: false });
      return prevShots;
    });
}

export function fetchShot(id) {
  return api.fetchShot(id).then(shot => {
    store.setState({ shots: [shot] });
    return shot;
  });
}

export function fetchComments(id) {
  const { shots } = store.getState();
  const [shot] = shots.filter(s => s.id == id);
  return api.fetchComments(id, shot.comments_count).then(comments => {
    store.setState({ shots: shots.map(s => (s.id === id ? { ...shot, comments } : s)) });
    return comments;
  });
}
