import Auth from "./Auth";
export const logout = (e) => {
  e.preventDefault();
  Auth.logout();
};
