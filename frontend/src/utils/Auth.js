import decode from "jwt-decode";

class AuthService {
  // Retrieve data saved in token
  getProfile() {
    if (typeof window !== "undefined") {
      return decode(this.getToken());
    }
  }

  // check if the user is still logged in
  loggedIn() {
    if (typeof window !== "undefined") {
      // Checks if there is a saved token and it's still valid
      const token = this.getToken();
      // use type coersion to check if token is NOT undefined and the token is NOT expired
      return !!token && !this.isTokenExpired(token);
    }
  }

  // Check if the token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // Retrieve token from localStorage
  getToken() {
    // Retrieves the user token from localStorage
    if (typeof window !== "undefined") {
      // Perform localStorage action
      return localStorage.getItem("id_token");
    }
  }

  // set token to localStorage and reload page to homepage
  login(idToken) {
    if (typeof window !== "undefined") {
      // Saves user token to localStorage
      localStorage.setItem("id_token", idToken);

      window.location.assign("/");
    }
  }

  // Initial Login before they've added any areas
  loginFirstTime(idToken) {
    if (typeof window !== "undefined") {
      // Saves user token to localStorage
      localStorage.setItem("id_token", idToken);

      window.location.assign("/welcome");
    }
  }
  // clear token from localStorage and force logout with reload
  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();
