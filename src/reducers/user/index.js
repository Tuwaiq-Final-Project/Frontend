const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ? user : {},
  isLogedIn: user ? true : false
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_USER":
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        user: payload,
        isLogedIn: true
      };
    case "ADD_TOKEN":
      localStorage.setItem("token", JSON.stringify(payload));
      return {
        user: state.user,
        isLogedIn: true
      };
    case "REMOVE_USER":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        user: {},
        isLogedIn: false
      };

    default:
      return state;
  }
};

export default userReducer;
