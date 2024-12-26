import { loadData, saveData } from "./storage";

export const registerUser = ({ name, email, phone, gender, password }) => {
  const users = loadData();
  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    throw new Error("Email is already registered.");
  }

  users.push({ name, email, phone, gender, password });
  saveData(users);
  return "Registration successful!";
};

export const loginUser = ({ identifier, password }) => {
  const users = loadData();
  const user = users.find(
    user => (user.email === identifier || user.name === identifier) && user.password === password
  );

  if (!user) {
    throw new Error("Invalid credentials.");
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  return user;
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};

export const resetPassword = ({ email, newPassword }) => {
  const users = loadData();
  const userIndex = users.findIndex(user => user.email === email);

  if (userIndex === -1) {
    throw new Error("Email not found.");
  }

  users[userIndex].password = newPassword;
  saveData(users);
  return "Password reset successful!";
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};
