export const loadData = () => {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
};

export const saveData = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};
