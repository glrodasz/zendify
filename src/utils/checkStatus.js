const checkStatus = response => {
  if (response.status >= 400) {
    throw new Error(`Error: ${response.statusText}, Code: ${response.status}.`);
  }

  return response;
};

export default checkStatus;
