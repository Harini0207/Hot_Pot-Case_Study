import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "jwtToken";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser() {
  const token = getToken();
  if (!token || token.split('.').length !== 3) return null;
  return jwtDecode(token);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/";
}
