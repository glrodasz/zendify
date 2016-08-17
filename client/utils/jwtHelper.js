import jwtDecode from 'jwt-decode';

export const getTokenExpirationDate = token => {
  const decoded = jwtDecode(token);
  if (!decoded.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
};

export const isTokenExpired = token => {
  const date = getTokenExpirationDate(token);
  return date === null ? false : !(date.valueOf() > new Date().valueOf());
};
