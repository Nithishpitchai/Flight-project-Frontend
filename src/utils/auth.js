// Save auth info to localStorage
export const saveAuth = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

// Get token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Get user info
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Remove token & user (for logout)
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
