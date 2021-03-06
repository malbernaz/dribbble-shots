import * as api from "./lib/dribbbleService";
import { unique, map } from "./lib/util";
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
        shots: unique([...prevShots, ...shots], s => s.id),
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
  const { shots = [] } = store.getState();
  const [shot] = shots.filter(s => s.id == id);
  if (shot) {
    return Promise.resolve(shots);
  }
  return api.fetchShot(id).then(shot => {
    store.setState({ shots: unique([...shots, shot], s => s.id) });
    return shot;
  });
}

export function fetchComments(id) {
  const { shots } = store.getState();
  const [shot] = shots.filter(s => s.id == id);
  return api.fetchComments(id, shot.comments_count).then(comments => {
    store.setState({
      shots: map(shots, s => (s.id === id ? { ...shot, comments } : s))
    });
    return comments;
  });
}
