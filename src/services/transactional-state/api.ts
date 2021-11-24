import axios from "axios";

const alreadyDoingRequestForThatURL: { [key: string]: boolean } = {};

// block duplicate request
axios.interceptors.request.use((request) => {
  const url = request.url as unknown as string;
  if (alreadyDoingRequestForThatURL[url]) {
    return Promise.reject();
  }

  alreadyDoingRequestForThatURL[url] = true;

  return request;
});

axios.interceptors.response.use((response) => {
  const url = response.config.url as unknown as string;
  alreadyDoingRequestForThatURL[url] = false;

  return response;
});

export const get = <T>(url: string, params?: T) => axios.get(url, { params });
