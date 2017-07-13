import * as api from "./lib/dribbbleService";
import store from "./store";

export function fetchShots(page) {
  return api.fetchShots(page).then(shots => {
    const { shots: prevShots } = store.getState();
    store.setState({
      shots: shots.reduce(
        (acc, next) => ({
          ...acc,
          [next.id]: next
        }),
        prevShots
      )
    });
  });
}

export function fetchShot(id) {
  return api.fetchShot(id).then(shot => {
    const { shots } = store.getState();
    store.setState({ shots: { ...shots, [id]: shot } });
  });
}

export function fetchComments(id) {
  return api.fetchComments(id).then(comments => {
    const { shots } = store.getState();
    const shot = shots[id];
    store.setState({
      shots: { ...shots, [id]: { ...shot, comments: [...(shot.comments || []), ...comments] } }
    });
  });
}
