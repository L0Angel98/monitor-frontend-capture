import jwtDecode from "jwt-decode";

function decodeToken(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    return null;
  }
}

export default decodeToken;
