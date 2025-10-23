// src/utils/auth.js
// ✅ Add this at the top of src/utils/auth.js
export const saveUserLoggedIn = (userData) => {
  if (userData) {
    localStorage.setItem("user", JSON.stringify(userData));
  }
};

// Save JWT token to localStorage
export const saveToken = (token) => {
  if (token) {
    localStorage.setItem("authToken", token);
  }
};

// ✅ Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("authToken");
};

// ✅ Remove token (for logout)
export const clearToken = () => {
  localStorage.removeItem("authToken");
};

// ✅ Check if user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("authToken");
};

// ✅ Save user object to localStorage
export const saveUser = (user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

// ✅ Get user info from localStorage
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};


// ✅ Get only user ID (MongoDB uses `_id`)
export const getUserId = () => {
  const user = getUser();
  return user?._id || user?.id || null; // supports both
};

// ✅ Get only user role
export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

// ✅ Clear user info along with token (logout)
export const logoutUser = () => {
  clearToken();
  localStorage.removeItem("user");
};

// ✅ Check if user is logged in AND (optionally) has a specific role
export const isUserLoggedIn = (role = null) => {
  if (!isLoggedIn()) return false;
  if (!role) return true;
  return getUserRole() === role;
};

// ✅ Correct storage




// Save user object to localStorage
