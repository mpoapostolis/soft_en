export const callToLogin = ({ username, password }) => dispatch => {
  const url = "/api/auth/oauth/token";
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Basic YnJvd3Nlcjo=", // hashed Browser
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `scope=ui&username=${username}&password=${password}&grant_type=password`,
  })
    .then(res => res.json())
    .then(data => {
      // get Token
    });
};
