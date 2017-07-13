const clientAccessToken = "9dd33d536ffabf2486afd0155033ab4fa51e4eb982096b5b1c72206ccfce1f4a";

function fetchAPI(endpoint) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${clientAccessToken}`);
  return fetch(`https://api.dribbble.com/v1/${endpoint}`, {
    headers,
    credentials: "include"
  }).then(res => {
    if (!res.ok) {
      return res.json().then(({ message }) => {
        throw new Error(message);
      });
    }
    return res.json();
  });
}

export function fetchShots(page = 1) {
  return fetchAPI(`shots?per_page=24&page=${page}`);
}

export function fetchShot(id) {
  return fetchAPI(`shots/${id}`);
}

export function fetchComments(id, count = 12) {
  return fetchAPI(`shots/${id}/comments?per_page=${count}`);
}
