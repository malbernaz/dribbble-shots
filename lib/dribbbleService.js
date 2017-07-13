const clientAccessToken = "61b8907fa07c9ee135d1c61ff7e75b02caaa6791994a659cecd321685f68ea69";

function fetchAPI(endpoint) {
  return fetch(`https://api.dribbble.com/v1/${endpoint}`, {
    headers: { Authorization: `Bearer ${clientAccessToken}` }
  }).then(res => res.json());
}

export function fetchShots(page = 1) {
  return fetchAPI(`shots?per_page=24&page=${page}`);
}

export function fetchShot(id) {
  return fetchAPI(`shots/${id}`);
}

export function fetchComments(id) {
  return fetchAPI(`shots/${id}/comments`);
}
