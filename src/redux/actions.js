export const login = payload => ({ type: "LOGIN", payload });

export const callToLogin = ({ username, password }) => dispatch => {
  const url = "/api/bo/login";
  return fetch(
    url
    // {
    // method: "GET",
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded",
    //   Authorization: "Basic " + base64.encode(`${username}:${password}`)
    // }
    // }
  )
    .then(res => res.json())
    .then(res => console.log(res));
};
