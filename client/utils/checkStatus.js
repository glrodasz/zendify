const checkStatus = response => {
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}.`);
  }

  return response;
};

export default checkStatus;
