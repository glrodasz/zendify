import decode from 'jwt-decode';

export const getTokenExpirationDate = token => {
  const decoded = decode(token);

  if (!decoded.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
};

export const isTokenExpired = token => {
  const date = getTokenExpirationDate(token);

  if (date === null) {
    return false;
  }
  return !(date.valueOf() > new Date().valueOf());
};
