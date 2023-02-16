const baseUrl = "https://restcountries.com/v3.1";

interface FetchInstanceType {
  get: (url: string, config?: RequestInit) => Promise<any>;
  post: (url: string, data?: any, config?: RequestInit) => Promise<any>;
}

const processResponse = async (response: Response) => {
  const json = await response.json();
  // Reject 4xx and 5xx responses
  if (/^(4|5)/.test(String(response.status))) {
    throw json;
  }
  return json;
};

export const restAPIInstance: FetchInstanceType = {
  get: (url, config) =>
    fetch(`${baseUrl}${url}`, {
      ...(config || {}),
      method: "GET",
      headers: {
        ...(config?.headers || {}),
      },
    }).then(processResponse),
  post: (url, data, config) =>
    fetch(`${baseUrl}${url}`, {
      body: JSON.stringify(data),
      ...(config || {}),
      method: "POST",
      headers: {
        ...(config?.headers || {}),
      },
    }).then(processResponse),
};
