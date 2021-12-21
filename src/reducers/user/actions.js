export const addUser = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};
export const addToken = (token) => {
  return {
    type: "ADD_TOKEN",
    payload: token,
  };
};

export const removeUser = () => {
  return {
    type: "REMOVE_USER",
  };
};
