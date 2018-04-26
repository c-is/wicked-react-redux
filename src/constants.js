const url = process.env.endpointFormat;
// const url = "http://localhost:3004";

const apiBaseURL = {
  projects: `${url}/projects`,
  new: `${url}/projects/new`,
  users: `${url}/users`,
  countries: `${url}/countries`,
  currentUser: `${url}/users/current`,
  usageStats: `${url}/results/awrusagestats`,
};

export {
  apiBaseURL,
};
